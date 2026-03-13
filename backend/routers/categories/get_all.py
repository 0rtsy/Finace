from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import models, get_db
from tools import get_current_user, format_currency

router = APIRouter()


@router.get("/get_info")
async def get_info_categories(
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	categories: list[type[models.Categories]] = (
		db.query(models.Categories)
		.filter(models.Categories.owner_id.in_(user.family.members_id))
		.all()
	)

	cost_leader = {
		"id": None,
		"expenses": 0
	}

	categories_data = []

	for category in categories:
		category_records: list[type[models.Records]] = (
			db.query(models.Records)
			.filter(models.Records.category_id == category.id)
			.all()
		)

		category_total = 0
		category_total_expenses = 0

		for record in category_records:
			amount = record.amount
			if record.type == "expenses":
				amount *= -1

				date_30days = datetime.now() - timedelta(days=30)
				if record.created_at.year >= date_30days.year and record.created_at.month >= date_30days.now().month:
					category_total_expenses += amount

			category_total += amount

		if cost_leader["expenses"] < category_total_expenses:
			cost_leader["expenses"] = category_total_expenses
			cost_leader["id"] = category.id

		records_count = len(category_records)
		records_word = "записей"
		if records_count % 10 == 1:
			records_word = "запись"
		elif 1 < records_count % 10 < 5:
			records_word = "записи"

		categories_data.append({
			"id": category.id,
			"name": category.name,
			"iconName": category.icon_name,
			"color": category.color,
			"records": f"{records_count} {records_word}",
			"total": {
				"type": "expenses" if category_total < 0 else "income",
				"value": format_currency(abs(category_total))
			}
		})

	return {
		"cost_leader": cost_leader,
		"categories": categories_data
	}