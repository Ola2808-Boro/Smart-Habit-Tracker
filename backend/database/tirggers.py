from connection_db import create_connection
import logging
def create_note_trigger():
    conn=create_connection()
    try:
        sql_note_trigger="""
            CREATE TRIGGER habit_tracker.insert_note_trigger()
            AFTER INSERT ON habit_tracker.note
            FOR EACH ROW
            BEGIN
                INSERT INTO habit_tracker.thought (note_id)
                VALUES(NEW.note_id)
            END;
        """
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()
        