from fastapi import APIRouter, HTTPException, status
from app.data import organizations

router = APIRouter()


@router.get("/organizations")
def get_organizations(): 
  return organizations

@router.get("/organizations/{organization_id}")
def get_organization_by_id(organization_id: int): 
  get_organization = get_organizations()
  for organization in get_organization: 
    if organization['id'] == organization_id:
      return organization 
  raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Organization not found")
