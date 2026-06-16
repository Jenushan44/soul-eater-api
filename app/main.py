from fastapi import FastAPI, HTTPException, status
from app.data import characters, weapons, organizations, abilities

app = FastAPI()

@app.get("/")
def root(): 
  return {"message": "Soul Eater API is running"}

@app.get("/characters")
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


@app.get("/characters/{character_id}")
def get_character_by_id(character_id: int): 
  get_character = get_characters()
  for character in get_character: 
    if character["id"] == character_id: 
      return character
  raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Character not found")

@app.get("/weapons")
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

@app.get("/weapons/{weapon_id}") 
def get_weapon_by_id(weapon_id: int):  
  get_weapon = get_weapons() 
  for weapon in get_weapon: 
    if weapon['id'] == weapon_id: 
      return weapon
  raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Weapon not found")

@app.get("/organizations")
def get_organizations(): 
  return organizations

@app.get("/organizations/{organization_id}")
def get_organization_by_id(organization_id: int): 
  get_organization = get_organizations()
  for organization in get_organization: 
    if organization['id'] == organization_id:
      return organization 
  raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Organization not found")

@app.get("/abilities") 
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

@app.get("/abilities/{ability_id}") 
def get_ability_by_id(ability_id: int):
  get_ability = get_abilities()
  for ability in get_ability: 
    if ability['id'] == ability_id: 
      return ability
  raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ability not found")
