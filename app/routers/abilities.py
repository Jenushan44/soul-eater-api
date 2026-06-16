from fastapi import APIRouter, HTTPException, status
from app.data import abilities

router = APIRouter()

@router.get("/abilities") 
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

@router.get("/abilities/{ability_id}") 
def get_ability_by_id(ability_id: int):
  get_ability = get_abilities()
  for ability in get_ability: 
    if ability['id'] == ability_id: 
      return ability
  raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ability not found")