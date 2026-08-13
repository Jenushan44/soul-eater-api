from app.data import characters, weapons, abilities, organizations, arcs
import os 
import psycopg2 
from psycopg2.extras import Json

db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")

connection = psycopg2.connect(
  host = db_host, 
  port = db_port, 
  database = db_name, 
  user = db_user, 
  password = db_password
)

cursor = connection.cursor()
cursor.execute("SELECT version();")
result = cursor.fetchone()
print(result)

cursor.close()
connection.close()