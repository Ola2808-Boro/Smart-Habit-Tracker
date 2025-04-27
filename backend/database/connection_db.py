import logging
import os

import psycopg2
from dotenv import load_dotenv

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
    except Exception as e:
        logging.info(repr(e))
        return None


create_connection()
