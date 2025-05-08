from connection_db import create_connection
import logging
def create_note_trigger():
    conn=create_connection()
    try:
        cursor=conn.cursor()
        sql_function = """
            CREATE OR REPLACE FUNCTION insert_note_function()
            RETURNS TRIGGER AS $$
            BEGIN
                IF EXISTS (
                    SELECT 1 FROM habit_tracker.activity
                    WHERE activity_date = CURRENT_DATE
                ) THEN
                    INSERT INTO habit_tracker.activity (note_id, activity_date, user_id)
                    VALUES (NEW.note_id, CURRENT_DATE, 1); -- Podstaw wartość user_id!
                END IF;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        """

        cursor.execute(sql_function)
        
        cursor.execute("DROP TRIGGER IF EXISTS insert_note_trigger ON habit_tracker.note;")
        cursor.execute("""
            CREATE TRIGGER insert_note_trigger
            AFTER INSERT ON habit_tracker.note
            FOR EACH ROW
            EXECUTE FUNCTION habit_tracker.insert_note_function();
        """)
        conn.commit()
        logging.info('Adding note_trigger')
        
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()
        
create_note_trigger()