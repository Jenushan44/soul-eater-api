from app.data import characters, weapons, abilities, organizations, arcs
import os 
import psycopg2 
from psycopg2 import _json


os.getenv("DB_HOST")