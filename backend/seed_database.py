from app.data import characters, weapons, abilities, organizations, arcs
import os 
import psycopg2 
from psycopg2.extras import Json

db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")

# Reads the PostgreSQL connection settings that are passed into the backend container by Docker compose
connection = psycopg2.connect(
  host = db_host, 
  port = db_port, 
  database = db_name, 
  user = db_user, 
  password = db_password
)

# Creates a cursor to execute SQL 
cursor = connection.cursor()

for character in characters:
    cursor.execute("INSERT INTO characters (id, name, role, affiliation, description, species, sex, soul_type, status, occupations, partners, abilities, debut, continuity, image_url) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (character["id"], character["name"], character["role"], character["affiliation"], character["description"], character["species"], character["sex"], character["soul_type"], character["status"], Json(character["occupations"]), Json(character["partners"]), Json(character["abilities"]), character["debut"], character["continuity"], character.get("image_url")))

for weapon in weapons:
    cursor.execute("INSERT INTO weapons (id, name, weapon_type, weapon_category, meister, affiliation, abilities, description, status, image_url, continuity) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (weapon["id"], weapon["name"], weapon["weapon_type"], weapon["weapon_category"], Json(weapon["meister"]), weapon["affiliation"], Json(weapon["abilities"]), weapon["description"], weapon["status"], weapon.get("image_url"), weapon["continuity"]))

for ability in abilities:
    cursor.execute("INSERT INTO abilities (id, name, category, users, description, continuity, image_url) VALUES (%s, %s, %s, %s, %s, %s, %s)", (ability["id"], ability["name"], ability["category"], Json(ability["users"]), ability["description"], ability["continuity"], ability.get("image_url")))

for organization in organizations:
    cursor.execute("INSERT INTO organizations (id, name, organization_type, display_type, leader, location, members, description, status, image_url) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (organization["id"], organization["name"], organization["organization_type"], organization["display_type"], organization["leader"], organization["location"], Json(organization["members"]), organization["description"], organization["status"], organization.get("image_url")))

for arc in arcs:
    cursor.execute("INSERT INTO arcs (id, name, episodes, manga_chapters, main_characters, main_conflict, description, status, image_url) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (arc["id"], arc["name"], arc.get("episodes"), arc.get("manga_chapters"), Json(arc["main_characters"]), arc["main_conflict"], arc["description"], arc["status"], arc.get("image_url")))

connection.commit()
cursor.close()
connection.close()