import re

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from db import get_db, models
from tools import get_current_user


router = APIRouter()


class CheckValidInviteCode(BaseModel):
	code: str

class InviteToFamily(BaseModel):
	code: str
	family_role: str


@router.post("/check")
async def check_invite_code(
		data: CheckValidInviteCode,
		db: Session = Depends(get_db)
):
	invite_code = data.code

	if not re.match(r'^[A-Za-z0-9]+$', invite_code):
		return {"success": False}
	elif len(invite_code) != 6:
		return {"success": False}

	family: type[models.Families] = db.query(models.Families).filter(models.Families.invite_code == invite_code).first()
	if family is not None:
		return {
			"success": True,
			"owner": {
				"name": family.owner.name,
				"avatar": family.owner.avatar
			},
			"members": len(family.members_id)
		}
	return {"success": False}

@router.post("/invite")
async def invite_to_family(
		data: InviteToFamily,
		db: Session = Depends(get_db),
		user: models.Users = Depends(get_current_user)
):
	if user.family is not None:
		return {
			"status": 401,
			"details": "You are already part of a family"
		}
	elif not re.match(r'^[A-Za-z0-9]+$', data.code):
		return {
			"status": 404,
			"details": "Family not found"
		}
	elif len(data.code) != 6:
		return {
			"status": 404,
			"details": "Family not found"
		}
	elif len(data.family_role) > 16:
		raise HTTPException(status_code=400, detail="Invalid arguments")

	family_data: type[models.Families] = db.query(models.Families).filter(models.Families.invite_code == data.code).first()
	if family_data is None:
		return {
			"status": 404,
			"details": "Family not found"
		}

	new_members_list = family_data.members_id.copy()
	new_members_list.append(user.id)

	family_data.members_id = new_members_list
	db.commit()

	user.family_id = family_data.id
	user.family_role = data.family_role
	db.add(user)
	db.commit()

	return {
		"status": 200,
		"family_id": family_data.id
	}





