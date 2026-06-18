from fastapi import APIRouter, HTTPException, status
from app.data import arcs
from app.utils.helpers import find_item_by_id
from app.schemas import Arc


router = APIRouter()

@router.get("/arcs", response_model=list[Arc]) 
def get_arcs(name: str | None = None): 
  result = arcs 
  if name is not None: 
    filter_arcs = []
    for arc in arcs: 
      if name.lower() in arc['name'].lower(): 
        filter_arcs.append(arc)

    result = filter_arcs    
  return result 

@router.get("/arcs/{arc_id}", response_model=Arc)
def get_arc_by_id(arc_id: int): 
  get_arc = get_arcs()
  return find_item_by_id(get_arc, arc_id, "Arc not found")