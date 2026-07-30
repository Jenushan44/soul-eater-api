from fastapi import APIRouter, HTTPException, status
from app.data import characters
from app.utils.helpers import find_item_by_id
from app.schemas import Character

router = APIRouter()

@router.get("/characters", response_model=list[Character])
def get_characters(role: str |  None = None, affiliation: str | None = None, name: str | None = None, species: str | None = None, status: str | None = None, sex: str | None = None, soul_type: str | None = None, continuity: str | None = None, occupation: str | None = None, partner: str | None = None, ability: str | None = None,):

  result = characters


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

  if species is not None:
    filter_species = []
    for character in result:
      if character["species"].lower() == species.lower():
        filter_species.append(character)

    result = filter_species

  if status is not None:
    filter_status = []

    for character in result:
      if character["status"].lower() == status.lower():
        filter_status.append(character)

    result = filter_status

  if sex is not None:
    filter_sex = []

    for character in result:
      if character["sex"].lower() == sex.lower():
        filter_sex.append(character)

    result = filter_sex

  if soul_type is not None:
    filter_soul_type = []

    for character in result:
      if character["soul_type"].lower() == soul_type.lower():
        filter_soul_type.append(character)

    result = filter_soul_type

  if continuity is not None:
    filter_continuity = []

    for character in result:
      if character["continuity"].lower() == continuity.lower():
        filter_continuity.append(character)

    result = filter_continuity

  if occupation is not None:
    filter_occupation = []

    for character in result:
      for character_occupation in character["occupations"]:
        if occupation.lower() in character_occupation.lower():
          filter_occupation.append(character)
          break

    result = filter_occupation

  if partner is not None:
    filter_partner = []

    for character in result:
      for character_partner in character["partners"]:
        if partner.lower() in character_partner.lower():
          filter_partner.append(character)
          break

    result = filter_partner

  if ability is not None:
    filter_ability = []

    for character in result:
      for character_ability in character["abilities"]:
        if ability.lower() in character_ability.lower():
          filter_ability.append(character)
          break

    result = filter_ability

  return result


@router.get("/characters/{character_id}", response_model = Character)
def get_character_by_id(character_id: int): 
  get_character = get_characters()
  return find_item_by_id(get_character, character_id, "Character not found")