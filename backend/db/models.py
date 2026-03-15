from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime, JSON
from datetime import datetime

from sqlalchemy.orm import relationship

from .base import Base


class Users(Base):
	__tablename__ = "users"

	id = Column(Integer, primary_key=True, index=True)
	name = Column(String(32), nullable=False)
	email = Column(String, unique=True, nullable=False)
	password = Column(String(64), nullable=False)
	avatar = Column(String(8), nullable=False, default="blue") # blue, green, purple, orange, red
	family_role = Column(String(16), default=None)
	family_id = Column(ForeignKey('families.id'))
	family = relationship("Families", foreign_keys=[family_id])

	def __repr__(self):
		return (f"<Users "
				f"id={self.id} "
				f"name={self.name} "
				f"email={self.email} "
				f"password={self.password} "
				f"avatar={self.avatar} "
				f"family_role={self.family_role} "
				f"family_id={self.family_id}>")

class Records(Base):
	__tablename__ = "records"

	id = Column(String(64), primary_key=True, nullable=False)
	amount = Column(Float, nullable=False)
	type = Column(String(8), nullable=False) # expenses | income
	owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
	owner = relationship("Users", foreign_keys=[owner_id])
	description = Column(String(100))
	created_at = Column(DateTime, default=datetime.now)
	category_id = Column(String, ForeignKey("categories.id"))
	category = relationship("Categories", foreign_keys=[category_id])

class Categories(Base):
	__tablename__ = "categories"

	id = Column(String(64), primary_key=True, nullable=False)
	name = Column(String(24), nullable=False)
	icon_name = Column(String, nullable=False)
	color = Column(String(16), nullable=False)
	owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
	owner = relationship("Users", foreign_keys=[owner_id])

class Families(Base):
	__tablename__ = "families"

	id = Column(String(64), primary_key=True, nullable=False)
	members_id = Column(JSON, default=list, nullable=False)
	owner_id = Column(ForeignKey('users.id'), nullable=False)
	owner = relationship("Users", foreign_keys=[owner_id])
	invite_code = Column(String(8), nullable=False)

	def __repr__(self):
		return f"<Families id={self.id} members={self.members_id} owner={self.owner_id} invite_code={self.invite_code}>"