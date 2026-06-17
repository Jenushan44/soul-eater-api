from fastapi import APIRouter
from app.data import organizations
from app.utils.helpers import find_item_by_id

router = APIRouter()


@router.get("/organizations")
def get_organizations(): 
  return organizations

@router.get("/organizations/{organization_id}")
def get_organization_by_id(organization_id: int): 
  get_organization = get_organizations()
  return find_item_by_id(get_organization, organization_id, "Organization not found")