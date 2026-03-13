from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db import get_db, models
from tools import get_current_user


router = APIRouter()


@router.post("/leave")
async def leave_from_family(
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	if user.family is None:
		return {
			"status": 400,
			"error": "Family not found" # |!| redirect the user to the family creation page
		}

	if user.family.owner_id == user.id:
		# Delete family

		for user_id in user.family.members_id:
			member: type[models.Users] = (
				db.query(models.Users)
				.filter(models.Users.id == user_id)
				.first()
			)
			if member is not None:
				member.family_id = None
				member.family = None
				member.family_role = None
		db.commit()

		db.delete(user.family)
		return {
			"status": 200
		}

	if user.id in user.family.members_id:
		user.family.members_id.remove(user.id)

	user.family_role = None
	user.family_id = None
	user.family = None
	db.commit()

	return {
		"status": 200
	}