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
        logging.info(f"Created connection")
        return conn
    except OperationalError as e:
        logging.info(f"Database connection failed: {e}")
    except ProgrammingError as e:
        logging.info(f"SQL syntax or logic error: {e}")
    except IntegrityError as e:
        logging.info(f"Data integrity violation (e.g. unique constraint): {e}")
    except DatabaseError as e:
        logging.info(f"General database error: {e}")
    except Exception as e:
        logging.info(f"Unexpected error: {e}")

create_connection()
