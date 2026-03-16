import re

from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session

from tools import get_current_user
from db import models, get_db

router = APIRouter()


@router.delete("/delete/{category_id}")
async def delete_category(
		category_id: str,
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	if user.family_id is None:
		return {
			"status": 403,
			"msg": "Family not found."
		}
	elif len(category_id) != 64:
		return {
			"status": 400,
			"msg": "Invalid data"
		}
	elif not re.match(r'^[A-Za-z0-9]+$', category_id):
		return {
			"status": 400,
			"msg": "Invalid data"
		}

	category: type[models.Categories] = (
		db.query(models.Categories)
		.filter(models.Categories.id == category_id)
		.first()
	)

	if category is None:
		return {
			"status": 404,
			"msg": "Категория не найдена."
		}
	elif category.owner_id not in user.family.members_id:
		return {
			"status": 403,
			"msg": "Категория не найдена"
		}
	elif category.owner_id != user.id and user.family.owner_id != user.id:
		return {
			"status": 403,
			"msg": "Недостаточно прав"
		}

	category_records: list[type[models.Records]] = (
		db.query(models.Records)
		.filter(models.Records.category_id == category_id)
		.all()
	)

	for record in category_records:
		record.category_id = None
		db.add(record)
	db.commit()

	db.delete(category)
	db.commit()

	return {
		"status": 200,
		"name": category.name,
	}