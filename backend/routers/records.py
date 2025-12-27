from datetime import datetime, timedelta, date

from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session

from backend.db import models, get_db
from backend.tools import get_current_user

router = APIRouter()


def format_currency(value: float) -> str:
	"""Форматирование суммы в денежный формат"""
	formatted = f"{value:,.2f}".replace(",", " ").replace(".", ",")
	return f"{formatted} ₽"


def get_date_group(record_date: datetime) -> str:
	"""Определение группы даты (Сегодня, Вчера и т.д.)"""
	today = date.today()
	record_date_date = record_date.date()

	if record_date_date == today:
		return "Сегодня"
	elif record_date_date == today - timedelta(days=1):
		return "Вчера"
	elif record_date_date == today - timedelta(days=2):
		return "Позавчера"
	elif record_date_date >= today - timedelta(days=7):
		# Для дней в пределах недели - название дня недели
		days_ru = {
			0: "Понедельник",
			1: "Вторник",
			2: "Среда",
			3: "Четверг",
			4: "Пятница",
			5: "Суббота",
			6: "Воскресенье"
		}
		return days_ru[record_date_date.weekday()]
	else:
		# Для более старых дат - полная дата
		return record_date_date.strftime("%d %B %Y").replace(
			"January", "января").replace("February", "февраля").replace(
			"March", "марта").replace("April", "апреля").replace(
			"May", "мая").replace("June", "июня").replace(
			"July", "июля").replace("August", "августа").replace(
			"September", "сентября").replace("October", "октября").replace(
			"November", "ноября").replace("December", "декабря")


@router.post("/getMyRecords")
async def load_user_records_data(
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	records_query = (
		db.query(models.Records, models.Categories)
		.join(models.Categories, models.Records.category_id == models.Categories.id)
		.filter(models.Records.owner_id == user.id)
		.order_by(models.Records.created_at.desc())
		.all()
	)

	total_income = 0.0
	total_expenses = 0.0

	records_by_date = {}

	for record, category in records_query:
		# Суммируем общие суммы
		if record.type == "income":
			total_income += record.amount
		else:
			total_expenses += record.amount

		# Формируем запись
		formatted_record = {
			"id": record.id,
			"type": record.type,
			"name": category.name,
			"color": category.color,
			"iconName": category.icon_name,
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
