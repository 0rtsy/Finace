import re

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.config import family_invite_link
from backend.db import get_db, models
from backend.tools import get_current_user


router = APIRouter()


@router.post("/get_info")
async def get_my_family_info(
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	"""Получение данных всех членов семьи пользователя"""
	if user.family_id is None:
		return {
			"status": 400,
			"detail": "Family not found" # |!| redirect the user to the family creation page
		}

	family_data: type[models.Families] = db.query(models.Families).filter(models.Families.id == user.family_id).first()

	if family_data is None:
		user.family_id = None
		user.family_role = None
		db.commit()

		return {
			"status": 400,
			"detail": "Family not found" # |!| redirect the user to the family creation page
		}

	return_data = []
	for user_id in family_data.members_id:
		member: type[models.Users] = db.query(models.Users).filter(models.Users.id == user_id).first()

		if user is None:
			family_data.members_id.remove(user_id)
			db.commit()
			continue

		return_data.append({
			"name": member.name,
			"role": member.family_role
		})

	return {
		"status": 200,
		"data": return_data,
		"is_owner": family_data.owner_id == user.id,
		"invite_link": family_invite_link % family_data.invite_code
	}

