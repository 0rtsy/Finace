from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from backend.config import settings
from backend.db.base import Base



engine = create_engine(settings.database_url)
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


async def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()