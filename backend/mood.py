import logging

from database.connection_db import create_connection


def insert_mood(mood:str,hex:str):
    conn=create_connection()
    try:
        cursor=conn.cursor()
        sql_insert_mood="""
            INSERT INTO habit_tracker.mood(mood,color) VALUES(%s,%s)
        """
        cursor.execute(sql_insert_mood,(mood,hex))
        conn.commit()
        logging.info(f"Added mood: {mood} with color: {hex}")
        return True
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()
        
        
def insert_basic_moods():
    moods_data = [
    ('sad', '#ff0000'),
    ('angry', '#ff8c00'),
    ('happy', '#9acd32'),
    ('neutral', '#808080'),
    ('anxious', '#9370db'),
    ('excited', '#ffd700')
    ]
    conn=create_connection()
    try:
        cursor=conn.cursor()
        sql_insert_mood="""
            INSERT INTO habit_tracker.mood(mood,color) VALUES(%s,%s)
        """
        cursor.executemany(sql_insert_mood,moods_data)
        conn.commit()
        logging.info(f"Added data {moods_data}")
        return True
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()
        
insert_basic_moods()