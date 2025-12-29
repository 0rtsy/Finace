from fastapi import APIRouter
from backend.routers.families import create, get_members, kick_member


router = APIRouter(prefix="/families", tags=["families"])
router.include_router(create.router)
router.include_router(get_members.router)
router.include_router(kick_member.router)