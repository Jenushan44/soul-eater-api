from fastapi import FastAPI 

app = FastAPI()

@app.get("/")
def root(): 
  return {"message": "Soul Eater API is running"}

@app.get("/characters")
def get_characters(role: str |  None):
  filtered_role_characters = []

  characters = [
      {"id": 1, "name": "Maka Albarn", "role": "Meister", "affiliation": "DWMA"}, 
      {"id": 2, "name": "Soul Evans", "role": "Demon Weapon", "affiliation": "DWMA"},
      {"id": 3, "name": "Black Star", "role": "Meister", "affiliation": "DWMA"},
      {"id": 4, "name": "Tsubaki Nakatsukasa", "role": "Demon Weapon", "affiliation": "DWMA"},
      {"id": 5, "name": "Death the Kid", "role": "Meister", "affiliation": "DWMA"},
      ]
  
  if role is None: 
    return characters 
  else: 
    for character in characters: 
      if character["role"] == role: 
        filtered_role_characters.append(character)
    
    return filtered_role_characters

@app.get("/characters/{character_id}")
def get_character_by_id(character_id: int): 
  get_character = get_characters()
  for character in get_character: 
    if character["id"] == character_id: 
      return character
  return {"message": "Character not found"}
