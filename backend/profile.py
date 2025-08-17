import base64
import logging

from database.connection_db import create_connection
from psycopg2 import (
    Binary,
    DatabaseError,
    IntegrityError,
    OperationalError,
    ProgrammingError,
)


def update_avatar_image(data: dict, current_user_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_insert_avatar_image = """
            UPDATE habit_tracker.user  SET avatar_image=%s WHERE user_id=%s
        """
        image_data = data["image"]
        if image_data.startswith("data:image"):
            image_data = image_data.split(",")[1]
        image_bytes = base64.b64decode(image_data)
        print(type(image_bytes))
        cursor.execute(sql_insert_avatar_image, (Binary(image_bytes), current_user_id))
        conn.commit()
        logging.info(f"Added avatar image:for user with id {current_user_id}")
        return 201, "Succesfully added navatar image"
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


def get_avatar_image(current_user_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_avatar_image = """
            SELECT avatar_image FROM habit_tracker.user  WHERE user_id=%s 
        """
        cursor.execute(sql_select_avatar_image, (current_user_id,))
        results = cursor.fetchone()[0]
        if results is not None:
            results = base64.b64encode(results).decode("utf-8")
            results = f"data:image/png;base64,{results}"
        logging.info(f"Retrieved avatar image:for user with id {current_user_id}")
        return 201, "Succesfully retrieved avatar image", results
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


def get_user_data(current_user_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_user_data = """
            SELECT first_name,last_name,date_join FROM habit_tracker.user  WHERE user_id=%s 
        """
        cursor.execute(sql_select_user_data, (current_user_id,))
        results = cursor.fetchall()[0]
        logging.info(f"Retrieved user data with id {current_user_id}")
        return 201, "Succesfully retrieved user data", results
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
