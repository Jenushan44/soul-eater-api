from fastapi import APIRouter, HTTPException, status
from app.data import abilities
from app.utils.helpers import find_item_by_id
from app.schemas import Ability


router = APIRouter()

@router.get("/abilities", response_model=list[Ability]) 
def get_abilities(name: str | None = None, user: str | None = None, ability_type: str | None = None): 
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
        user_list = ability.get("users")
        if isinstance(user_list, list):
          for each_user in user_list: 
            if user.lower() in each_user.lower():
              filter_ability_user.append(ability)
              break
      result = filter_ability_user



  if ability_type is not None: 
    filter_ability_type = []
    for ability in result: 
      if ability_type.lower() in ability['ability_type'].lower():
        filter_ability_type.append(ability)
    result = filter_ability_type

  return result  

@router.get("/abilities/{ability_id}", response_model=Ability) 
def get_ability_by_id(ability_id: int):
  get_ability = get_abilities()
  return find_item_by_id(get_ability, ability_id, "Ability not found")