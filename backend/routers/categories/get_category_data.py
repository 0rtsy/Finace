import re
from datetime import date, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from tools import get_current_user, format_currency
from db import get_db, models


router = APIRouter()


@router.get("/get/{category_id}")
async def get_category_data(
		category_id: str,
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	if len(category_id) != 64:
		return {"error": 400}
	elif not re.match(r"^[a-zA-Z0-9]+$", category_id):
		return {"error": 400}

	category: type[models.Categories] = (
		db.query(models.Categories)
		.filter(models.Categories.id == category_id)
		.first()
	)
	if category is None:
		return {
			"error": 404,
			"msg": "Категория не найдена"
		}
	elif category.owner.family_id != user.family_id:
		return {
			"error": 403,
			"msg": "Категория не найдена"
		}

	category_records: list[type[models.Records]] = (
		db.query(models.Records)
		.filter(models.Records.category_id == category_id)
		.all()
	)

	lastest_records_data = []
	total_income = 0
	total_expenses = 0
	for record in category_records:
		if record.type == "expenses":
			total_expenses += record.amount
		else:
			total_income += record.amount

		if len(lastest_records_data) >= 30:
			continue

		today = date.today()
		record_date_date = record.created_at.date()

		if record_date_date == today:
			record_date = record.created_at.strftime("%H:%M")
		elif record_date_date == today - timedelta(days=1):
			record_date = "Вчера " + record.created_at.strftime("%H:%M")
		elif record_date_date == today - timedelta(days=2):
			record_date = "Позавчера " + record.created_at.strftime("%H:%M")
		else:
			record_date = record_date_date.strftime("%d %B %Y").replace(
				"January", "янв.").replace("February", "фев.").replace(
				"March", "мар.").replace("April", "апр.").replace(
				"May", "мая").replace("June", "июн.").replace(
				"July", "июл.").replace("August", "авг.").replace(
				"September", "сен.").replace("October", "окт.").replace(
				"November", "ноя.").replace("December", "дек.")

		lastest_records_data.append({
			"id": record.id,
			"creator": {
				"name": record.owner.name,
				"avatar": record.owner.avatar
			},
			"createdAt": record_date,
			"description": record.description,
			"amount": {
				"value": format_currency(record.amount),
				"type": record.type
			}
		})

	return {
		"error": None,
		"creator": {
			"id": category.owner_id,
			"name": category.owner.name,
			"role": category.owner.family_role,
			"avatar": category.owner.avatar
		},
		"totals": {
			"income": format_currency(total_income),
			"expenses": format_currency(total_expenses)
		},
		"lastestRecords": lastest_records_data
	}