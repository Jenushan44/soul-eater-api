from fastapi import APIRouter, HTTPException, status
from app.data import arcs
from app.utils.helpers import find_item_by_id
from app.schemas import Arc


router = APIRouter()

@router.get("/arcs", response_model=list[Arc]) 
def get_arcs(name: str | None = None, characters: str | None = None, status: str | None = None): 
  
  if name is None and characters is None and status is None: 
    return arcs
  
  filtered_results = []

  for arc in arcs: 
    is_match = True 

    if name is not None: 
      if name.lower() not in arc.get("name", "").lower(): 
        is_match = False

    if status is not None: 
      if status.lower() not in arc.get("status", "").lower():
        is_match = False


    if characters is not None: 
        found_character = False 
        search_name = characters.lower()
        for character_name in arc.get("main_characters", []):
           if search_name in character_name.lower():  
            found_character = True 
            break
        
        if not found_character: 
           is_match = False
    
    if is_match: 
       filtered_results.append(arc)

  return filtered_results

@router.get("/arcs/{arc_id}", response_model=Arc)
def get_arc_by_id(arc_id: int): 
  return find_item_by_id(arcs, arc_id, "Arc not found")