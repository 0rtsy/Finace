from fastapi import APIRouter

from . import get_records, create

router = APIRouter()
router.include_router(get_records.router)
router.include_router(create.router)