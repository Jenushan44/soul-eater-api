from fastapi import APIRouter
from backend.app.data import organizations
from backend.app.utils.helpers import find_item_by_id
from backend.app.schemas import Organization

router = APIRouter()


@router.get("/organizations", response_model=list[Organization])
def get_organizations(): 
  return organizations

@router.get("/organizations/{organization_id}", response_model=Organization)
def get_organization_by_id(organization_id: int): 
  get_organization = get_organizations()
  return find_item_by_id(get_organization, organization_id, "Organization not found")