import os

import psycopg2
from dotenv import load_dotenv

load_dotenv()


def create_connection():
    try:
        conn = psycopg2.connect(
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
        )

    except Exception as e:
        print(repr(e))


create_connection()
