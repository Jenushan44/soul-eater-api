from app.data import characters, weapons, abilities, organizations, arcs
import os 
import psycopg2 
from psycopg2.extras import Json

db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")

# Reads the PostgreSQL connection settings that re passed into the backend container by Docker compose
connection = psycopg2.connect(
  host = db_host, 
  port = db_port, 
  database = db_name, 
  user = db_user, 
  password = db_password
)

character = characters[0]

cursor = connection.cursor()
cursor.execute("INSERT INTO characters VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (character['id'], character['name'], character['role'], character['affiliation'], character['description'], character['species'], character['sex'], character['soul_type'], character['status'], character['occupations'], character['partners'], character['abilities'], character['debut'], character['continuity'], character['image_url']))


cursor.close()
connection.close()