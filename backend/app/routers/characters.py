from fastapi import APIRouter, HTTPException, status
from backend.app.data import characters
from backend.app.utils.helpers import find_item_by_id
from backend.app.schemas import Character

router = APIRouter()

@router.get("/characters", response_model=list[Character])
def get_characters(role: str |  None = None, affiliation: str | None = None, name: str | None = None,):
  result = characters

  if role is None and affiliation is None and name is None: 
    return characters 

  if role is not None: 
    filter_role = []
    for character in result: 
      if character["role"].lower() == role.lower(): 
        filter_role.append(character)
    result = filter_role 

  if affiliation is not None:
    filter_affiliation = [] 
    for character in result: 
      if character["affiliation"].lower() == affiliation.lower(): 
        filter_affiliation.append(character)
    result = filter_affiliation 

  if name is not None: 
    filter_name = []
    for character in result: 
      if name.lower() in character["name"].lower(): 
        filter_name.append(character)
    result = filter_name

  return result


@router.get("/characters/{character_id}", response_model = Character)
def get_character_by_id(character_id: int): 
  get_character = get_characters()
  return find_item_by_id(get_character, character_id, "Character not found")