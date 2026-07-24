from pydantic import BaseModel

class Character(BaseModel): 
  id: int 
  name: str 
  role: str 
  affiliation: str 
  description: str
  image_url: str | None = None
  species: str
  status: str

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
    organization_type: str
    display_type: str
    leader: str
    location: str
    members: list[str]
    description: str
    status: str
    image_url: str | None = None

class Ability(BaseModel): 
  id: int
  name: str 
  category: str
  users: list[str] 
  description: str 
  continuity: str
  image_url: str | None = None

class Arc(BaseModel): 
  id: int
  name: str
  episodes: str | None = None
  manga_chapters: str | None = None
  main_characters: list[str]
  main_conflict: str
  description: str
  status: str
  image_url: str | None = None
