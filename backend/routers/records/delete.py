import re

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db import models, get_db
from tools import get_current_user

router = APIRouter()


@router.delete("/delete/{record_id}")
async def delete_record(
		record_id: str,
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	if user.family_id is None:
		return {
			"status": 403,
			"msg": "Family not found"
		}
	elif len(record_id) != 64:
		return {
			"status": 400,
			"msg": "Invalid data"
		}
	elif not re.match(r'^[A-Za-z0-9]+$', record_id):
		return {
			"status": 400,
			"msg": "Invalid data"
		}

	record: type[models.Records] = (
		db.query(models.Records)
		.filter(models.Records.id == record_id)
		.first()
	)

	if record is None:
		return {
			"status": 404,
			"msg": "Запись не найдена"
		}
	elif record.owner_id not in user.family.members_id:
		return {
			"status": 403,
			"msg": "Запись не найдена"
		}
	elif record.owner_id != user.id and user.family.owner_id != user.id:
		return {
			"status": 403,
			"msg": "Недостаточно прав"
		}

	db.delete(record)
	db.commit()

	return {
		"status": 200,
		"msg": "",
	}