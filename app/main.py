from fastapi import FastAPI
from app.routers.characters import router as character_router
from app.routers.abilities import router as ability_router
from app.routers.arcs import router as arc_router
from app.routers.organizations import router as organization_router
from app.routers.weapons import router as weapon_router
from app.data import characters, weapons, abilities, arcs, organizations 

app = FastAPI()
app.include_router(character_router)
app.include_router(ability_router)
app.include_router(arc_router)
app.include_router(organization_router)
app.include_router(weapon_router)

@app.get("/")
def root(): 
  return {"message": "Soul Eater API is running"}

@app.get("/api")
def get_api_information(): 
  return {"api_name": "Soul Eater API", "version": "1.0.0", "description": "A REST API providing information about Soul Eater characters, weapons, organizations, abilities and story arcs.", "available_endpoints": ["/characters", "/characters/{character_id}", "/weapons", "/weapons/{weapon_id}", "/organizations", "/organizations/{organization_id}", "/abilities", "/abilities/{ability_id}", "/arcs", "/arcs/{arc_id}"]}

@app.get("/search")
def global_search(q: str): 
  user_query = q
  q = q.lower()

  temp_character = []
  for character in characters: 
    if q in character['name'].lower() or q in character['role'].lower() or q in character['affiliation'].lower() or q in character['description'].lower(): 
      temp_character.append(character)
  
  temp_weapon = []
  for weapon in weapons: 
    if q in weapon['name'].lower() or q in weapon['weapon_type'].lower() or q in weapon['partner'].lower() or q in weapon['affiliation'].lower() or q in weapon['description'].lower(): 
      temp_weapon.append(weapon)
  
  temp_organization = []
  for organization in organizations: 
    if q in organization['name'].lower() or q in organization['type'].lower() or q in organization['description'].lower(): 
      temp_organization.append(organization)
  
  temp_ability = []
  for ability in abilities: 
    if q in ability['name'].lower() or q in ability['ability_type'].lower() or q in ability['user'].lower() or q in ability['description'].lower(): 
      temp_ability.append(ability)
  
  temp_arc = []
  for arc in arcs: 
    if q in arc['name'].lower() or q in arc['episodes'].lower() or q in arc['description'].lower(): 
      temp_arc.append(arc)
  
  return {"query": user_query, "characters": temp_character, "weapons": temp_weapon, "organizations": temp_organization, "abilities": temp_ability, "arcs": temp_arc}
