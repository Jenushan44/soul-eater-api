from fastapi import APIRouter
from app.utils.helpers import find_item_by_id
from app.data import weapons

router = APIRouter()

@router.get("/weapons")
def get_weapons(weapon_type: str | None = None, partner: str | None = None, name: str | None = None):
  result = weapons 
  
  if weapon_type is not None: 
    filter_weapon_type = []
    for weapon in result: 
      if weapon['weapon_type'].lower() == weapon_type.lower(): 
        filter_weapon_type.append(weapon)
    result = filter_weapon_type

  if partner is not None: 
    filter_partner = []
    for weapon in result: 
      if partner.lower() in weapon['partner'].lower(): 
        filter_partner.append(weapon)
    result = filter_partner

  if name is not None: 
    filter_weapon_name = []
    for weapon in result: 
      if name.lower() in weapon['name'].lower(): 
        filter_weapon_name.append(weapon)
    result = filter_weapon_name

  return result 

@router.get("/weapons/{weapon_id}") 
def get_weapon_by_id(weapon_id: int):  
  get_weapon = get_weapons() 
  return find_item_by_id(get_weapon, weapon_id, "Weapon not found")