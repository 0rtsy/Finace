from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db import models, get_db
from tools import get_current_user, generate_random_string

router = APIRouter()


@router.post("/create")
async def create_family(
	user: models.Users = Depends(get_current_user),
	db: Session = Depends(get_db)
):
	if user.family_id is not None:
		return {"error": "Вы уже состоите в семье"}

	while True:
		new_family_id = generate_random_string(64)
		if db.query(models.Families).filter(models.Families.id == new_family_id).first() is None:
			break

	while True:
		new_invite_code = generate_random_string(8)
		if db.query(models.Families).filter(models.Families.invite_code == new_invite_code).first() is None:
			break

	db.add(
		models.Families(
			id=new_family_id,
			members_id=[],
			owner_id=user.id,
			invite_code=new_invite_code,
		)
	)
	db.commit()

	return {
		"error": None,
		"family_id": new_family_id
	}