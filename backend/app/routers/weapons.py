from fastapi import APIRouter
from app.utils.helpers import find_item_by_id
from app.data import weapons
from app.schemas import Weapon
from app.database import get_weapons_from_db
import os 

router = APIRouter()


@router.get("/weapons", response_model=list[Weapon])
def get_weapons( weapon_type: str | None = None, weapon_category: str | None = None, meister: str | None = None, affiliation: str | None = None, status: str | None = None, continuity: str | None = None, ability: str | None = None, name: str | None = None,):

  if os.getenv("DB_HOST"):
    result = get_weapons_from_db()
  else:
    result = weapons


  result = weapons

  if weapon_type is not None:
    filter_weapon_type = []

    for weapon in result:
      if weapon_type.lower() in weapon["weapon_type"].lower():
        filter_weapon_type.append(weapon)

    result = filter_weapon_type

  if weapon_category is not None:
    filter_weapon_category = []

    for weapon in result:
      if weapon_category.lower() in weapon["weapon_category"].lower():
        filter_weapon_category.append(weapon)

    result = filter_weapon_category

  if meister is not None:
    filter_meister = []

    for weapon in result:
      for weapon_meister in weapon["meister"]:
        if meister.lower() in weapon_meister.lower():
          filter_meister.append(weapon)
          break

    result = filter_meister

  if affiliation is not None:
    filter_affiliation = []

    for weapon in result:
      if affiliation.lower() in weapon["affiliation"].lower():
        filter_affiliation.append(weapon)

    result = filter_affiliation

  if status is not None:
    filter_status = []

    for weapon in result:
      if status.lower() in weapon["status"].lower():
        filter_status.append(weapon)

    result = filter_status

  if continuity is not None:
    filter_continuity = []

    for weapon in result:
      if continuity.lower() in weapon["continuity"].lower():
        filter_continuity.append(weapon)

    result = filter_continuity

  if ability is not None:
    filter_ability = []

    for weapon in result:
      for weapon_ability in weapon["abilities"]:
        if ability.lower() in weapon_ability.lower():
          filter_ability.append(weapon)
          break

    result = filter_ability

  if name is not None:
    filter_weapon_name = []

    for weapon in result:
      if name.lower() in weapon["name"].lower():
        filter_weapon_name.append(weapon)

    result = filter_weapon_name

  return result

@router.get("/weapons/{weapon_id}", response_model=Weapon)
def get_weapon_by_id(weapon_id: int):
  return find_item_by_id(weapons, weapon_id, "Weapon not found")