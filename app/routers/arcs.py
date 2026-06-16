from fastapi import APIRouter, HTTPException, status
from app.data import arcs

router = APIRouter()

@router.get("/arcs") 
def get_arcs(name: str | None = None): 
  result = arcs 
  if name is not None: 
    filter_arcs = []
    for arc in arcs: 
      if name.lower() in arc['name'].lower(): 
        filter_arcs.append(arc)

    result = filter_arcs    
  return result 

@router.get("/arcs/{arc_id}")
def get_arc_by_id(arc_id: int): 
  get_arc = get_arcs()
  for arc in get_arc: 
    if arc['id'] == arc_id: 
      return arc 
  raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Arc not found")
