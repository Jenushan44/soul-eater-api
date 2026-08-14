from fastapi import APIRouter
from app.data import organizations
from app.utils.helpers import find_item_by_id
from app.schemas import Organization
from app.database import get_organizations_from_db
import os

router = APIRouter()


@router.get("/organizations", response_model=list[Organization])
def get_organizations( name: str | None = None, organization_type: str | None = None, leader: str | None = None, location: str | None = None, status: str | None = None):  

  if os.getenv("DB_HOST"):
    result = get_organizations_from_db()
  else:
    result = organizations

  if (name is None and organization_type is None and leader is None and location is None and status is None):
    return organizations

  if name is not None: 
    filter_name = []
    for organization in result: 
      if name.lower() in organization["name"].lower(): 
        filter_name.append(organization)
    result = filter_name

  if organization_type is not None: 
    filter_type = []
    for organization in result: 
      if organization_type.lower() in organization["organization_type"].lower(): 
        filter_type.append(organization)
    result = filter_type

  if leader is not None: 
    filter_leader = []
    for organization in result: 
      if leader.lower() in organization["leader"].lower(): 
        filter_leader.append(organization)
    result = filter_leader

  if status is not None: 
    filter_status = []
    for organization in result: 
      if status.lower() in organization["status"].lower(): 
        filter_status.append(organization)
    result = filter_status

  if location is not None:
    filter_location = []

    for organization in result:
      if location.lower() in organization["location"].lower():
        filter_location.append(organization)

    result = filter_location

  return result

@router.get("/organizations/{organization_id}", response_model=Organization)
def get_organization_by_id(organization_id: int): 
  return find_item_by_id(organizations, organization_id, "Organization not found")