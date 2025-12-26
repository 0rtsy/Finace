from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime, JSON
from datetime import datetime
from backend.db.base import Base


class Users(Base):
	__tablename__ = "users"

	id = Column(Integer, primary_key=True, index=True)
	name = Column(String(32), nullable=False)
	email = Column(String, unique=True, nullable=False)
	password = Column(String(64), nullable=False)
	family_rule = Column(String(16), default=None)

class Records(Base):
	__tablename__ = "records"

	id = Column(String(64), primary_key=True, nullable=False)
	amount = Column(Float, nullable=False)
	created_at = Column(DateTime, default=datetime.now())
	owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
	category_id = Column(String, ForeignKey("categories.id"))

class Categories(Base):
	__tablename__ = "categories"

	id = Column(String(64), primary_key=True, nullable=False)
	name = Column(String(24), nullable=False)
	icon_name = Column(String, nullable=False)
	color = Column(String(16), nullable=False)

class Families(Base):
	__tablename__ = "families"

	id = Column(String(64), primary_key=True, nullable=False)
	members_id = Column(JSON, default=list, nullable=False)
	owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)