from fastapi import APIRouter, HTTPException, status
from app.data import abilities
from app.utils.helpers import find_item_by_id
from app.schemas import Ability


router = APIRouter()

@router.get("/abilities", response_model=list[Ability]) 
def get_abilities(name: str | None = None, user: str | None = None): 
  result = abilities 

  if name is not None: 
    filter_ability_name = []
    for ability in result: 
      if name.lower() in ability['name'].lower(): 
        filter_ability_name.append(ability)
    result = filter_ability_name

  if user is not None: 
    filter_ability_user = []
    for ability in result: 
      if user.lower() in ability['user'].lower(): 
        filter_ability_user.append(ability)
    result = filter_ability_user

  return result  

@router.get("/abilities/{ability_id}", response_model=Ability) 
def get_ability_by_id(ability_id: int):
  get_ability = get_abilities()
  return find_item_by_id(get_ability, ability_id, "Ability not found")