from fastapi import APIRouter
from app.utils.helpers import find_item_by_id
from app.data import weapons
from app.schemas import Weapon


router = APIRouter()

@router.get("/weapons", response_model=list[Weapon])
def get_weapons(weapon_type: str | None = None, meister: str | None = None, name: str | None = None):
  result = weapons 
  
  if weapon_type is not None: 
    filter_weapon_type = []
    for weapon in result: 
      if weapon.get('weapon_type') and weapon_type.lower() in weapon['weapon_type'].lower(): 
        filter_weapon_type.append(weapon)
    result = filter_weapon_type

  if meister is not None: 
    filter_meister = []
    for weapon in result: 
      if weapon.get('meister') and meister.lower() in weapon['meister'].lower(): 
        filter_meister.append(weapon)
    result = filter_meister

  if name is not None: 
    filter_weapon_name = []
    for weapon in result: 
      if weapon.get('name') and name.lower() in weapon['name'].lower(): 
        filter_weapon_name.append(weapon)
    result = filter_weapon_name

  return result 

@router.get("/weapons/{weapon_id}", response_model = Weapon) 
def get_weapon_by_id(weapon_id: int):  
  return find_item_by_id(weapons, weapon_id, "Weapon not found")