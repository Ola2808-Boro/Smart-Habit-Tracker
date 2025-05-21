import logging

from database.connection_db import create_connection


def insert_category(data:dict,current_user_id:int):
    conn=create_connection()
    try:
        cursor = conn.cursor()
        sql_insert_category = """
            INSERT INTO habit_tracker.habit_category(category,user_id) VALUES(%s,%s)
        """
        cursor.execute(sql_insert_category, (data['category'],))
        conn.commit()
        logging.info(f"Added category to table ")
        return True
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()