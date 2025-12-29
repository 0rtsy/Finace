import re
from datetime import datetime, timedelta, date

from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from backend.config import no_category_color
from backend.db import models, get_db
from backend.tools import get_current_user, format_currency

router = APIRouter()


def get_date_group(record_date: datetime) -> str:
	today = date.today()
	record_date_date = record_date.date()

	if record_date_date == today:
		return "Сегодня"
	elif record_date_date == today - timedelta(days=1):
		return "Вчера"
	elif record_date_date == today - timedelta(days=2):
		return "Позавчера"
	else:
		return record_date_date.strftime("%d %B %Y").replace(
			"January", "января").replace("February", "февраля").replace(
			"March", "марта").replace("April", "апреля").replace(
			"May", "мая").replace("June", "июня").replace(
			"July", "июля").replace("August", "августа").replace(
			"September", "сентября").replace("October", "октября").replace(
			"November", "ноября").replace("December", "декабря")


@router.post("/get_my_data")
async def load_user_records_data(
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	records_query: list[type[models.Records]] = (
		db.query(models.Records)
		.filter(models.Records.owner_id == user.id)
		.order_by(models.Records.created_at.desc())
		.all()
	)
	print(records_query)

	total_income = 0.0
	total_expenses = 0.0

	records_by_date = {}

	for record in records_query:
		if record.type == "income":
			total_income += record.amount
		else:
			total_expenses += record.amount

		if record.category_id is None:
			category_name = "Без категории"
			category_color = no_category_color
			category_icon = "no_category"
		else:
			category_data: type[models.Categories] = (
				db.query(models.Categories).filter(models.Categories.id == record.category_id).first()
			)
			if category_data is None:
				category_name = "Без категории"
				category_color = no_category_color
				category_icon = "no_category"
			else:
				category_name = category_data.name
				category_color = category_data.color
				category_icon = category_data.icon_name


		formatted_record = {
			"id": record.id,
			"type": record.type,
			"name": category_name,
			"color": category_color,
			"iconName": category_icon,
			"description": record.description,
			"sum": format_currency(record.amount),
			"amount": record.amount,
			"date": int(record.created_at.timestamp() * 1000)
		}

		date_group = get_date_group(record.created_at)

		if date_group not in records_by_date:
			records_by_date[date_group] = []
		records_by_date[date_group].append(formatted_record)

	records_data = []
	for date_group_name, records_list in records_by_date.items():
		records_data.append({
			"date": date_group_name,
			"records": records_list
		})

	total_all = total_income + total_expenses
	income_percent = int((total_income / total_all * 100)) if total_all > 0 else 0
	expenses_percent = int((total_expenses / total_all * 100)) if total_all > 0 else 0

	result = {
		"totals": {
			"income": {
				"sum": format_currency(total_income),
				"percent": income_percent
			},
			"expenses": {
				"sum": format_currency(total_expenses),
				"percent": expenses_percent
			}
		},
		"recordsData": records_data
	}

	return result


@router.post("/get_owner/<record_id>")
async def record_info(
		record_id: str,
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	if not re.match(r'^[A-Za-z0-9]+$', record_id):
		raise HTTPException(status_code=400, detail="Invalid arguments")
	elif len(record_id) != 64:
		raise HTTPException(status_code=400, detail="Invalid arguments")

	record_data: type[models.Records] = db.query(models.Records).filter(models.Records.id == record_id).first()

	if record_data is None:
		return {
			"error": "Not found"
		}

	if record_data.owner_id == user.id:
		return {
			"error": None,
			"data": {
				"name": user.name,
				"role": user.family_role
			}
		}
	record_owner = db.query(models.Users).filter(models.Users.id == record_data.owner_id).first()
	if record_owner is None:
		return {
			"error": "Not found"
		}
	elif record_owner.family_id is not None:
		family_data: type[models.Families] = (
			db.query(models.Families)
			.filter(models.Families.id == record_owner.family_id)
			.first()
		)
		if family_data is None:
			return {
				"error": "Not found"
			}
		elif (
				record_owner.id not in family_data.members_id or
				user.id not in family_data.members_id
		):
			return {
				"error": "Not found"
			}
		return {
			"error": None,
			"data": {
				"name": record_owner.name,
				"role": record_owner.family_role
			}
		}
	else:
		return {
			"error": "Not found"
		}

