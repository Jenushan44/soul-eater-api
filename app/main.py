from fastapi import FastAPI, HTTPException, status
from app.data import characters, weapons

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