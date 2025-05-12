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
        return None
    finally:
        conn.close()


def check_user_acivity_day():
    conn=create_connection()
    try:
        cursor = conn.cursor()
        sql_select_activity = """
            SELECT activity_id FROM habit_tracker.activity WHERE activity_date=CURRENT_DATE;
        """
        cursor.execute(sql_select_activity)
        result = cursor.fetchone()
        logging.info(f'Activity_id for acivity_id: {result}')
        return result
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()
        
    

def select_user(data: dict):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_user = """
            SELECT user_id,first_name,last_name FROM habit_tracker.user WHERE email=%s AND password_hash=%s;
        """
        cursor.execute(sql_select_user, (data["email"], data["password"]))
        result = cursor.fetchone()

        if result and not check_user_acivity_day():
            sql_insert_activity="""
                INSERT INTO habit_tracker.activity(user_id,activity_date) VALUES(%s,CURRENT_DATE)
            """
            cursor.execute(sql_insert_activity,(result[0],))
            conn.commit()
            logging.info(f'Add user activity')
        return result
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()


def check_user(data: dict):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_user = """
            SELECT user_id FROM habit_tracker.user WHERE email=%s;
        """
        cursor.execute(sql_select_user, (data["email"],))
        result = cursor.fetchone()
        logging.info(f"Check user results:{result}")
        return True
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()


def check_user_joined_date(current_user_id:int):
    conn=create_connection()
    try:
        cursor=conn.cursor()
        sql_check_joined_date="""
            SELECT date_join FROM habit_tracker.user WHERE user_id=%s
        """
        cursor.execute(sql_check_joined_date,(current_user_id,))
        joined_date=cursor.fetchone()[0]
        logging.info(f'Join date: {joined_date} for user: {current_user_id}')
        return joined_date
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()