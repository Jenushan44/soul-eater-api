from fastapi import FastAPI 

app = FastAPI()

@app.get("/")
def root(): 
  return {"message": "Soul Eater API is running"}

@app.get("/characters")
def get_characters(role: str |  None = None, affiliation: str | None = None):
  filtered_role_characters = []
  filtered_affiliation_characters = []
  filtered_role_affiliation_characters = []

  characters = [
      {"id": 1, "name": "Maka Albarn", "role": "Meister", "affiliation": "DWMA", "description": "A dedicated meister who partners with Soul Evans and works hard to become stronger."}, 
      {"id": 2, "name": "Soul Evans", "role": "Demon Weapon", "affiliation": "DWMA", "description": "A demon weapon who transforms into a scythe and is Maka Albarn’s partner."},
      {"id": 3, "name": "Black Star", "role": "Meister", "affiliation": "DWMA", "description": "A loud and confident meister from the Star Clan who wants to surpass everyone."},
      {"id": 4, "name": "Tsubaki Nakatsukasa", "role": "Demon Weapon", "affiliation": "DWMA", "description": "A calm demon weapon who partners with Black Star and can transform into multiple ninja weapons."},
      {"id": 5, "name": "Death the Kid", "role": "Meister", "affiliation": "DWMA", "description": "The son of Death and a meister who is obsessed with symmetry."},
      ]

  if role is not None and affiliation is not None: 
    for character in characters: 
      if character["role"] == role and character["affiliation"] == affiliation:
        filtered_role_affiliation_characters.append(character)
    
    return filtered_role_affiliation_characters
  
  if role is None and affiliation is None: 
    return characters 

  if role is not None: 
    for character in characters: 
      if character["role"] == role: 
        filtered_role_characters.append(character)

  if affiliation is not None: 
    for character in characters: 
      if character["affiliation"] == affiliation: 
        filtered_affiliation_characters.append(character)

  return filtered_role_characters + filtered_affiliation_characters


@app.get("/characters/{character_id}")
def get_character_by_id(character_id: int): 
  get_character = get_characters()
  for character in get_character: 
    if character["id"] == character_id: 
      return character
  return {"message": "Character not found"}
