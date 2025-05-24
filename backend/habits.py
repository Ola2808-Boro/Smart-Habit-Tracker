import logging

from database.connection_db import create_connection


def insert_category(data:dict,current_user_id:int):
    conn=create_connection()
    try:
        cursor = conn.cursor()
        sql_select_all_category="""
            SELECT category_name FROM habit_tracker.category WHERE user_id=%s
        """
        cursor.execute(sql_select_all_category,(current_user_id,))
        results=cursor.fetchall()
        if data['category'] in [item[0] for item in results]:
            return False
        else:
            sql_insert_category = """
                INSERT INTO habit_tracker.category(category_name,user_id) VALUES(%s,%s)
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
            print(data['habit'],data['category'],current_user_id)
            sql_insert_habit = """
                INSERT INTO habit_tracker.habit(habit_name,user_id) VALUES(%s,%s)
                RETURNING habit_id;
            """
            cursor.execute(sql_insert_habit, (data['habit'],current_user_id))
            habit_id = cursor.fetchone()[0]
            print('id',habit_id)
            habit_category_data=[]
            for category in data['category']:
                if category==[]:
                    habit_category_data.append((habit_id,None,current_user_id))
                else:
                    sql_select_category_id="""
                        SELECT category_id FROM habit_tracker.category WHERE user_id=%s AND category_name=%s
                    """
                    cursor.execute(sql_select_category_id,(current_user_id,category))
                    category_id=cursor.fetchone()[0]
                    habit_category_data.append((habit_id,category_id,current_user_id))
            print(habit_category_data)
            sql_insert_habit_category = """
                INSERT INTO habit_tracker.habit_category(habit_id,category_id,user_id) VALUES(%s,%s,%s)
                RETURNING habit_id;
            """
            cursor.executemany(sql_insert_habit_category, habit_category_data)  
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
            SELECT category_name FROM habit_tracker.category WHERE user_id=%s
        """
        cursor.execute(sql_select_all_category,(current_user_id,))
        results=cursor.fetchall() 
        return [item for item in results]
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()
        
        
def get_habit(current_user_id:int):
    conn=create_connection()
    try:
        cursor = conn.cursor()
        sql_select_all_habit="""
            SELECT habit_id,habit_name FROM habit_tracker.habit WHERE user_id=%s
        """
        cursor.execute(sql_select_all_habit,(current_user_id,))
        habit_results=cursor.fetchall() 
        habits_data=[]
        for result in habit_results:
            habit_id,habit_name=result[0],result[1]
            sql_select_all_category_id="""
                SELECT category_id FROM habit_tracker.habit_category WHERE user_id=%s AND habit_id=%s
            """
            cursor.execute(sql_select_all_category_id,(current_user_id,habit_id))
            category_id_results=cursor.fetchall()
            categories=[]
            for category_id in category_id_results:
                sql_select_all_category_name="""
                    SELECT category_name FROM habit_tracker.category WHERE user_id=%s AND category_id=%s
                """
                cursor.execute(sql_select_all_category_name,(current_user_id,category_id))
                category_name_results=cursor.fetchone()[0]
                categories.append(category_name_results)
            habits_data.append({
                'habit':habit_name,
                'categories':categories
            })
        print(habits_data)
        return habits_data
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()
        
        
def save_habit(data:dict,current_user_id:int):
    conn=create_connection()
    try:
        print(data['time'])
        cursor = conn.cursor()
        sql_select_habit_id="""
            SELECT habit_id FROM habit_tracker.habit WHERE user_id=%s AND habit_name=%s
        """
        cursor.execute(sql_select_habit_id,(current_user_id,data['habit']))
        habit_id=cursor.fetchone()[0]
        sql_upsert="""
            INSERT INTO habit_tracker.habit_tracker(habit_id,duration)
            VALUES(%s,%s)
            ON CONFLICT (habit_id)
            DO UPDATE SET duration=EXCLUDED.duration
            RETURNING habit_tracker_detail_id;
        """
        cursor.execute(sql_upsert,(habit_id,data['time']))
        habit_tracker_detail_id=cursor.fetchone()[0]
        if data['time']=='0 seconds':
            sql_update="""
                UPDATE habit_tracker.activity SET habit_tracker_detail_id=%s
                WHERE user_id=%s AND activity_date=CURRENT_DATE
            """
            cursor.execute(sql_update,(habit_tracker_detail_id,current_user_id))
        conn.commit()
        logging.info(f"Saved habit")
        return True
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()