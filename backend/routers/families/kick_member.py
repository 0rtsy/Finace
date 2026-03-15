from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from db import get_db, models
from tools import get_current_user


router = APIRouter()


class KickUserData(BaseModel):
	user_id: int


@router.post("/kick_member")
async def kick_member_by_id(
		data: KickUserData,
		db: Session = Depends(get_db),
		user: models.Users = Depends(get_current_user)
):
	member: type[models.Users] = db.query(models.Users).filter(models.Users.id == data.user_id).first()

	if user.family is None:
		return {
			"status": 400,
			"error": "Family not found",  # |!| redirect the user to the family creation page
		}
	elif user.id != user.family.owner_id:
		raise HTTPException(status_code=400, detail="Permission denied")
	elif member is None:
		return {
			"status": 404,
			"error": "Пользователь не найден"
		}
	elif member.id not in user.family.members_id:
		return {
			"status": 404,
			"error": "Пользователь не найден"
		}

	family_data: type[models.Families] = db.query(models.Families).filter(models.Families.id == user.family_id).first()

	new_members_list = family_data.members_id.copy()
	new_members_list.remove(member.id)

	family_data.members_id = new_members_list
	db.commit()

	member.family_id = None
	member.family_role = None
	db.commit()

	return {
		"status": 200,
		"name": member.name,
	}
