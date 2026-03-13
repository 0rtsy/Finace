from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config import family_invite_link
from db import get_db, models
from tools import get_current_user, format_currency

router = APIRouter()


@router.get("/get_info")
async def get_my_family_info(
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	"""Получение основных данных семьи пользователя"""
	if user.family_id is None:
		return {
			"status": 400,
			"detail": "Family not found" # |!| redirect the user to the family creation page
		}

	# ===== Члены семьи =====
	return_data = []
	for user_id in user.family.members_id:
		member: type[models.Users] = db.query(models.Users).filter(models.Users.id == user_id).first()

		if member is None:
			user.family.members_id.remove(user_id)
			db.commit()
			continue

		return_data.append({
			"id": member.id,
			"name": member.name,
			"role": member.family_role,
			"avatar": member.avatar
		})

	# ===== Общее финансовое положение семьи =====
	record_amounts = []
	income_for_month = []
	income_for_last_month = []
	expenses_for_month = []
	expenses_for_last_month = []
	date_now = datetime.now()
	date_last_month = date_now - timedelta(days=31)

	for member in return_data:
		member_records: list[type[models.Records]] = (
			db.query(models.Records)
			.filter(models.Records.owner_id == member["id"])
			.all()
		)
		for record in member_records:
			for_month = (income_for_month, income_for_last_month)
			amount = int(record.amount * 100)
			if record.type == "expenses":
				for_month = (expenses_for_month, expenses_for_last_month)
				amount *= -1
			record_amounts.append(amount)

			if record.created_at.year == date_now.year and record.created_at.month == date_now.month:
				for_month[0].append(amount)
			elif record.created_at.year == date_last_month.year and record.created_at.month == date_last_month.month:
				for_month[1].append(amount)

	overall_balance = sum(record_amounts) / 100

	income_for_month = sum(income_for_month) / 100
	income_for_last_month = sum(income_for_last_month) / 100

	expenses_for_month = abs(sum(expenses_for_month) / 100)
	expenses_for_last_month = abs(sum(expenses_for_last_month) / 100)

	if income_for_last_month > 0:
		income_diff_percent = ((income_for_month - income_for_last_month) / income_for_last_month) * 100
	else:
		income_diff_percent = 100 if income_for_month > 0 else 0
	income_is_positive_trend = True if income_diff_percent >= 0 else False

	if expenses_for_last_month > 0:
		expenses_diff_percent = ((expenses_for_month - expenses_for_last_month) / expenses_for_last_month) * 100
	else:
		expenses_diff_percent = 100 if expenses_for_month > 0 else 0
	expenses_is_positive_trend = True if expenses_diff_percent >= 0 else False


	is_owner = user.family.owner_id == user.id

	return {
		"status": 200,
		"data": return_data,
		"owner_id": user.family.owner_id,
		"invite_code": user.family.invite_code if is_owner else None,
		"invite_link": family_invite_link % user.family.invite_code if is_owner else None,
		"overall_balance": format_currency(overall_balance),
		"for_month": {
			"income": {
				"percent": f"{'+' if income_is_positive_trend else ''}{round(income_diff_percent, 2)}%",
				"amount": format_currency(income_for_month)
			},
			"expenses": {
				"percent": f"{'+' if expenses_is_positive_trend else ''}{round(expenses_diff_percent, 2)}%",
				"amount": format_currency(expenses_for_month)
			}
		}
	}

