from fastapi import APIRouter, HTTPException, status
from app.data import abilities
from app.utils.helpers import find_item_by_id
from app.schemas import Ability
from app.database import get_abilities_from_db
import os

router = APIRouter()

@router.get("/abilities", response_model=list[Ability])
def get_abilities(name: str | None = None, user: str | None = None, category: str | None = None, continuity: str | None = None,):

  if os.getenv("DB_HOST"):
    result = get_abilities_from_db()
  else:
    result = abilities

  if name is not None:
    filtered_by_name = []

    for ability in result:
      if name.lower() in ability["name"].lower():
        filtered_by_name.append(ability)

    result = filtered_by_name

  if user is not None:
    filtered_by_user = []

    for ability in result:
      user_groups = ability.get("users", [])
      ability_matches = False

      for group in user_groups:
        for ability_user in group:
          if user.lower() in ability_user.lower():
            filtered_by_user.append(ability)
            ability_matches = True
            break

        if ability_matches:
          break

    result = filtered_by_user

  if category is not None:
    filtered_by_category = []

    for ability in result:
      if category.lower() in ability["category"].lower():
        filtered_by_category.append(ability)

    result = filtered_by_category

  if continuity is not None:
    filtered_by_continuity = []

    for ability in result:
      if continuity.lower() in ability["continuity"].lower():
        filtered_by_continuity.append(ability)

    result = filtered_by_continuity

  return result

@router.get("/abilities/{ability_id}", response_model=Ability) 
def get_ability_by_id(ability_id: int):
  get_ability = get_abilities()
  return find_item_by_id(get_ability, ability_id, "Ability not found")