import logging

import psycopg2
from connection_db import create_connection


def add_user(first_name: str, last_name: str, email: str, password_hash: str):
    try:
        conn = create_connection()
        cursor = conn.cursor()
        sql_add_user = """
            INSERT INTO user(first_name,last_name,email,password_hash,date_join) VALUES (%s,%s,%s,%s,CURRENT_DATE())
        """
        cursor.execute(sql_add_user, (first_name, last_name, email, password_hash))
        conn.commit()
        logging.info(f"New user added")
    except Exception as e:
        logging.info(repr(e))
    finally:
        conn.close()
