import logging

from database.connection_db import create_connection
from psycopg2 import DatabaseError, IntegrityError, OperationalError, ProgrammingError


def insert_new_mood_option(data: dict, current_user: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_insert_mood = """
            INSERT INTO habit_tracker.mood(mood,color,user_id) VALUES(%s,%s,%s)
        """
        cursor.execute(
            sql_insert_mood,
            (data["newMoodOption"], data["newMoodOptionColor"], current_user),
        )
        conn.commit()
        logging.info(
            f"Added mood: {data['newMoodOption']} with color: {data['newMoodOptionColor']}"
        )
        return 201, "Succesfully added new mood option"
    except ProgrammingError as e:
        logging.error(f"SQL syntax or logic error: {e}")
        return 500, "Database programming error."
    except IntegrityError as e:
        logging.error(f"Constraint violation: {e}")
        return 500, "Data integrity error."
    except OperationalError as e:
        logging.error(f"Database connection or transaction error: {e}")
        return 503, "Database operational error."
    except DatabaseError as e:
        logging.error(f"General database error: {e}")
        return 500, "Database error."
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return 500, "Unexpected server error."
    finally:
        conn.close()


def insert_basic_moods():
    moods_data = [
        ("sad", "#ff0000"),
        ("angry", "#ff8c00"),
        ("happy", "#9acd32"),
        ("neutral", "#808080"),
        ("anxious", "#9370db"),
        ("excited", "#ffd700"),
    ]
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_insert_mood = """
            INSERT INTO habit_tracker.mood(mood,color) VALUES(%s,%s)
        """
        cursor.executemany(sql_insert_mood, moods_data)
        conn.commit()
        logging.info(f"Added data {moods_data}")
        return 201, "Succesfully added mood basic options"
    except ProgrammingError as e:
        logging.error(f"SQL syntax or logic error: {e}")
        return 500, "Database programming error."
    except IntegrityError as e:
        logging.error(f"Constraint violation: {e}")
        return 500, "Data integrity error."
    except OperationalError as e:
        logging.error(f"Database connection or transaction error: {e}")
        return 503, "Database operational error."
    except DatabaseError as e:
        logging.error(f"General database error: {e}")
        return 500, "Database error."
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return 500, "Unexpected server error."
    finally:
        conn.close()


def update_user_mood(data: dict, current_user_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_mood_id = """
            SELECT mood_id FROM habit_tracker.mood WHERE mood=%s
        """
        cursor.execute(sql_select_mood_id, (data["selectedMood"],))
        mood_id = cursor.fetchone()[0]
        sql_update_activity = """
            UPDATE habit_tracker.activity
            SET mood_id=%s
            WHERE user_id=%s AND activity_date=CURRENT_DATE
        """
        cursor.execute(sql_update_activity, (mood_id, current_user_id))
        conn.commit()
        logging.info(f"Updated mood")
        return 201, "Succesfully updated user mood data"
    except ProgrammingError as e:
        logging.error(f"SQL syntax or logic error: {e}")
        return 500, "Database programming error."
    except IntegrityError as e:
        logging.error(f"Constraint violation: {e}")
        return 500, "Data integrity error."
    except OperationalError as e:
        logging.error(f"Database connection or transaction error: {e}")
        return 503, "Database operational error."
    except DatabaseError as e:
        logging.error(f"General database error: {e}")
        return 500, "Database error."
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return 500, "Unexpected server error."
    finally:
        conn.close()


def retrieved_mood_data(current_user_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_user_mood_data = """
            SELECT mood_id,activity_date FROM habit_tracker.activity WHERE user_id=%s AND mood_id IS NOT NULL;
        """
        cursor.execute(sql_select_user_mood_data, (current_user_id,))
        results = cursor.fetchall()
        mood_id, activity_date, mood_data = [], [], []
        for item in results:
            mood_id.append(item[0])
            activity_date.append(item[1])
            mood_data.append([item[0], item[1]])
        placeholder = ",".join(["%s"] * len(mood_id))
        if len(placeholder) > 0:
            sql_select_moods = f"""
                SELECT mood_id,mood,color FROM habit_tracker.mood WHERE mood_id IN ({placeholder})
            """
            cursor.execute(sql_select_moods, (mood_id))
            results = cursor.fetchall()
            for data in mood_data:
                for item in results:
                    if item[0] == data[0]:
                        data.extend([item[1], item[2]])
        return 200, "Succesfully retrieved mood data", mood_data
    except ProgrammingError as e:
        logging.error(f"SQL syntax or logic error: {e}")
        return 500, "Database programming error.", None
    except IntegrityError as e:
        logging.error(f"Constraint violation: {e}")
        return 500, "Data integrity error.", None
    except OperationalError as e:
        logging.error(f"Database connection or transaction error: {e}")
        return 503, "Database operational error.", None
    except DatabaseError as e:
        logging.error(f"General database error: {e}")
        return 500, "Database error.", None
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return 500, "Unexpected server error.", None
    finally:
        conn.close()


def get_mood_option(current_user_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_mood_option = """
        SELECT mood,color FROM habit_tracker.mood WHERE user_id=%s OR user_id IS NULL;
      """
        cursor.execute(sql_select_mood_option, (current_user_id,))
        results = cursor.fetchall()
        mood_options = []
        for item in results:
            mood_options.append([item[0], item[1]])
        logging.info("Retrieved mood option")
        return 200, "Succesfully retrieved mood options data", mood_options
    except ProgrammingError as e:
        logging.error(f"SQL syntax or logic error: {e}")
        return 500, "Database programming error.", None
    except IntegrityError as e:
        logging.error(f"Constraint violation: {e}")
        return 500, "Data integrity error.", None
    except OperationalError as e:
        logging.error(f"Database connection or transaction error: {e}")
        return 503, "Database operational error.", None
    except DatabaseError as e:
        logging.error(f"General database error: {e}")
        return 500, "Database error.", None
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return 500, "Unexpected server error.", None
    finally:
        conn.close()
