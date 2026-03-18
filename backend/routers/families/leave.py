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
	if user.family_id is None:
		return {
			"status": 400,
			"error": "Family not found" # |!| redirect the user to the family creation page
		}

	user: type[models.Users] = db.query(models.Users).filter(models.Users.id == user.id).first()

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

		family_data: type[models.Families] = (
			db.query(models.Families)
			.filter(models.Families.id == user.family_id)
			.first()
		)

		db.delete(family_data)
		db.commit()
		return {
			"status": 200
		}

	if user.id in user.family.members_id:
		family_data: type[models.Families] = (
			db.query(models.Families)
			.filter(models.Families.id == user.family_id)
			.first()
		)

		new_members_list = family_data.members_id.copy()
		new_members_list.remove(user.id)

		family_data.members_id = new_members_list
		db.commit()

	user: type[models.Users] = (
		db.query(models.Users)
		.filter(models.Users.id == user.id)
		.first()
	)

	user.family_role = None
	user.family_id = None
	db.add(user)
	db.commit()

	return {
		"status": 200
	}