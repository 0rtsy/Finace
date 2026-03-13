from fastapi import APIRouter
from routers.families import create, get_info, kick_member, invite, leave


router = APIRouter(prefix="/families", tags=["families"])
router.include_router(create.router)
router.include_router(get_info.router)
router.include_router(kick_member.router)
router.include_router(invite.router)
router.include_router(leave.router)