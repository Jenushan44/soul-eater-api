from fastapi import FastAPI 
from app.data import characters

app = FastAPI()

@app.get("/")
def root(): 
  return {"message": "Soul Eater API is running"}

@app.get("/characters")
def get_characters(role: str |  None = None, affiliation: str | None = None):
  filtered_role_characters = []
  filtered_affiliation_characters = []
  filtered_role_affiliation_characters = []


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
