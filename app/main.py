from fastapi import FastAPI
from app.routers.characters import router as character_router
from app.routers.abilities import router as ability_router
from app.routers.arcs import router as arc_router
from app.routers.organizations import router as organization_router
from app.routers.weapons import router as weapon_router
from app.routers.search import router as search_router

app = FastAPI()
app.include_router(character_router)
app.include_router(ability_router)
app.include_router(arc_router)
app.include_router(organization_router)
app.include_router(weapon_router)
app.include_router(search_router)

@app.get("/")
def root(): 
  return {"message": "Soul Eater API is running"}

@app.get("/api")
def get_api_information(): 
  return {"api_name": "Soul Eater API", "version": "1.0.0", "description": "A REST API providing information about Soul Eater characters, weapons, organizations, abilities and story arcs.", "available_endpoints": ["/characters", "/characters/{character_id}", "/weapons", "/weapons/{weapon_id}", "/organizations", "/organizations/{organization_id}", "/abilities", "/abilities/{ability_id}", "/arcs", "/arcs/{arc_id}"]}

