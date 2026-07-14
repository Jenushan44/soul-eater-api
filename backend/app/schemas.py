from pydantic import BaseModel

class Character(BaseModel): 
  id: int 
  name: str 
  role: str 
  affiliation: str 
  description: str
  image_url: str | None = None

class Weapon(BaseModel):
  id: int
  name: str
  weapon_type: str
  weapon_category: str
  meister: str
  affiliation: str
  abilities: list[str]
  description: str
  status: str
  image_url: str | None = None

class Organization(BaseModel): 
  id: int 
  name: str 
  type: str 
  description: str 

class Ability(BaseModel): 
  id: int
  name: str 
  ability_type: str 
  users: list[str] 
  description: str 

class Arc(BaseModel): 
  id: int 
  name: str 
  episodes: str 
  description: str 