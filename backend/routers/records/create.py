from fastapi import Depends, APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from unicodedata import category

from backend.db import get_db, models
from backend.tools import get_current_user, generate_random_string

router = APIRouter()


class Record(BaseModel):
	type: str
	sum: int | float
	description: str | None = None
	category_id: str | None = None


@router.post("/create")
async def create_record(
		record: Record,
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	if record.type not in ("income", "expenses",):
		raise HTTPException(status_code=400, detail="Invalid arguments")
	elif record.sum <= 0 or record.sum >= 10_000_000:
		raise HTTPException(status_code=400, detail="Invalid arguments")
	elif record.description is not None and len(record.description) > 100:
		raise HTTPException(status_code=400, detail="Invalid arguments")

	category_obj: None | models.Categories = db.query(models.Categories).filter_by(id=record.category_id).first()

	while True:
		new_record_id = generate_random_string(64)
		if db.query(models.Records).filter_by(id=new_record_id).first() is None:
			break

	db.add(
		models.Records(
			id=new_record_id,
			amount=record.sum,
			type=record.type,
			owner_id=user.id,
			description=record.description,
			category_id=None if category_obj is None else category_obj.id
		)
	)
	db.commit()
	return {
		"errors": None,
		"id": new_record_id
	}