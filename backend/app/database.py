import os 
import psycopg2 
from psycopg2.extras import RealDictCursor


db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")

def get_connection(): 
  connection = psycopg2.connect(host = db_host, port = db_port, database = db_name, user = db_user, password = db_password)

  return connection
  
def get_characters_from_db(): 
  connection = get_connection()
  cursor = connection.cursor(cursor_factory=RealDictCursor)

  cursor.execute("SELECT * FROM characters;")
  character_rows = cursor.fetchall()

  cursor.close()
  connection.close()

  return character_rows


def get_weapons_from_db():
  connection = get_connection()
  cursor = connection.cursor(cursor_factory=RealDictCursor)

  cursor.execute("SELECT * FROM weapons;")
  weapon_rows = cursor.fetchall()

  cursor.close()
  connection.close()

  return weapon_rows


def get_abilities_from_db():
  connection = get_connection()
  cursor = connection.cursor(cursor_factory=RealDictCursor)

  cursor.execute("SELECT * FROM abilities;")
  ability_rows = cursor.fetchall()

  cursor.close()
  connection.close()

  return ability_rows


def get_organizations_from_db():
  connection = get_connection()
  cursor = connection.cursor(cursor_factory=RealDictCursor)

  cursor.execute("SELECT * FROM organizations;")
  organization_rows = cursor.fetchall()

  cursor.close()
  connection.close()

  return organization_rows


def get_arcs_from_db():
  connection = get_connection()
  cursor = connection.cursor(cursor_factory=RealDictCursor)

  cursor.execute("SELECT * FROM arcs;")
  arc_rows = cursor.fetchall()

  cursor.close()
  connection.close()

  return arc_rows
