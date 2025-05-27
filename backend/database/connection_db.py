import logging
import os

import psycopg2
from dotenv import load_dotenv
from psycopg2 import OperationalError, ProgrammingError, IntegrityError, DatabaseError
load_dotenv()
logging.basicConfig(filename="myapp.log", level=logging.INFO, filemode="w")


def create_connection():
    try:
        conn = psycopg2.connect(
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
        )
        logging.info(f"Database connection established")
        return conn
    except OperationalError as e:
        logging.error(f"Database connection failed: {e}")
        return None   
    except DatabaseError as e:
        logging.error(f"General database error: {e}")
        return None
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return None

create_connection()
