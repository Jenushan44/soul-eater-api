from fastapi import APIRouter
from backend.app.data import characters, weapons, abilities, arcs, organizations 

router = APIRouter()


@router.get("/search")
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
