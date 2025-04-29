import logging

import psycopg2
from database.connection_db import create_connection


def add_user(data: dict):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_add_user = """
            INSERT INTO habit_tracker.user(first_name,last_name,email,password_hash,date_join) VALUES (%s,%s,%s,%s,CURRENT_DATE);
        """
        cursor.execute(
            sql_add_user,
            (
                data["firstName"],
                data["lastName"],
                data["email"],
                data["password"],
            ),
        )
        conn.commit()
        logging.info(f"New user added")
        return True
    except Exception as e:
        logging.info(repr(e))
    finally:
        conn.close()


def select_user(data: dict):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_user = """
            SELECT user_id,first_name FROM habit_tracker.user WHERE email=%s AND password_hash=%s;
        """
        cursor.execute(sql_select_user, (data["email"], data["password"]))
        result = cursor.fetchone()
        print(result)
        if result:
            sql_insert_activity="""
                INSERT INTO habit_tracker.activity(user_id,activity_date) VALUES(%s,CURRENT_DATE)
            """
            cursor.execute(sql_insert_activity,(result[0],))
            conn.commit()
            logging.info(f'Add user activity')
        return result
    except Exception as e:
        logging.info(f"Error: {e}")
    finally:
        conn.close()


def check_user(data: dict):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_user = """
            SELECT user_id,user_name FROM habit_tracker.user WHERE email=%s;
        """
        cursor.execute(sql_select_user, (data["email"]))
        result = cursor.fetchone()[0]
        logging.info(f"Check user results:{result}")
        return True
    except Exception as e:
        logging.info(f"Error: {e}")
        return False
    finally:
        conn.close()
