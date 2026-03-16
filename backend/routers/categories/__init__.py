from fastapi import APIRouter
from . import get_all, create, get_category_data, delete


router = APIRouter(prefix="/categories", tags=["categories"])
router.include_router(create.router)
router.include_router(get_all.router)
router.include_router(get_category_data.router)
router.include_router(delete.router)