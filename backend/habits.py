import logging

from database.connection_db import create_connection


def insert_category(data:dict,current_user_id:int):
    conn=create_connection()
    try:
        cursor = conn.cursor()
        sql_select_all_category="""
            SELECT category FROM habit_tracker.habit_category WHERE user_id=%s
        """
        cursor.execute(sql_select_all_category,(current_user_id,))
        results=cursor.fetchall()
        if data['category'] in [item[0] for item in results]:
            return False
        else:
            sql_insert_category = """
                INSERT INTO habit_tracker.habit_category(category,user_id) VALUES(%s,%s)
            """
            cursor.execute(sql_insert_category, (data['category'],current_user_id))
            conn.commit()
            logging.info(f"Added category to table ")
            return True
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()
        
        
def insert_habit(data:dict,current_user_id:int):
    conn=create_connection()
    try:
        cursor = conn.cursor()
        sql_select_all_habit="""
            SELECT habit_name FROM habit_tracker.habit WHERE user_id=%s
        """
        cursor.execute(sql_select_all_habit,(current_user_id,))
        results=cursor.fetchall()
        if data['habit'] in [item[0] for item in results]:
            return False
        else:
            sql_insert_habit = """
                INSERT INTO habit_tracker.habit(habit_name,habit_category,user_id) VALUES(%s,%s,%s)
            """
            cursor.execute(sql_insert_habit, (data['habit'],data['category'],current_user_id))
            conn.commit()
            logging.info(f"Added habit to table ")
            return True
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()
        
        
def get_category(current_user_id:int):
    conn=create_connection()
    try:
        cursor = conn.cursor()
        sql_select_all_category="""
            SELECT category FROM habit_tracker.habit_category WHERE user_id=%s
        """
        cursor.execute(sql_select_all_category,(current_user_id,))
        results=cursor.fetchall() 
        return [item for item in results]
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()