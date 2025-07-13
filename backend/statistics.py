import logging

import psycopg2
from database.connection_db import create_connection
from database.http_messages import HTTP_LOG_MESSAGES
from habits import get_category_id_by_habit_id, get_category_name, get_habit_name
from psycopg2 import DatabaseError, IntegrityError, OperationalError, ProgrammingError


def get_habit_tracker_detail_ids(cursor, current_user_id: int):
    sql_select_habit_tracker_detail_id = """
        SELECT habit_tracker_detail_id from habit_tracker.activity WHERE user_id=%s
    """
    cursor.execute(sql_select_habit_tracker_detail_id, (current_user_id,))
    results = cursor.fetchall()
    if results:
        return results
    logging.warning("Habit_tracker_detail_ids not found")
    return None


def get_habit_data(cursor, habit_tracker_detail_id: int):
    sql_select_habit_id = """
        SELECT habit_id,duration,done from habit_tracker.habit_tracker WHERE habit_tracker_detail_id=%s
    """
    cursor.execute(sql_select_habit_id, (habit_tracker_detail_id,))
    results = cursor.fetchall()
    if results:
        return results
    logging.warning("Habit data not found")
    return None


def get_all_habits_data(current_user_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        habit_tracker_detail_ids = get_habit_tracker_detail_ids(
            cursor=cursor, current_user_id=current_user_id
        )
        habits = []
        if habit_tracker_detail_ids:
            for habit_tracker_detail_id in habit_tracker_detail_ids:
                habits_data = get_habit_data(
                    cursor=cursor, habit_tracker_detail_id=habit_tracker_detail_id
                )
                if habits_data:
                    for habit_data in habits_data:
                        habit_id, duration, done = habit_data
                        habit_name = get_habit_name(
                            cursor=cursor,
                            current_user_id=current_user_id,
                            habit_id=habit_id,
                        )
                        print(f"Habit_id: {habit_id}")
                        category_ids = get_category_id_by_habit_id(
                            cursor=cursor,
                            current_user_id=current_user_id,
                            habit_id=habit_id,
                        )
                        if category_ids:
                            print(f"Habit_id yes: {habit_id}")
                            categories = []
                            for category_id in category_ids:
                                category_name = get_category_name(
                                    cursor=cursor,
                                    current_user_id=current_user_id,
                                    category_id=category_id,
                                )
                                if category_name is None:
                                    logging.warning(
                                        HTTP_LOG_MESSAGES[204].format(
                                            function_name="get_habit",
                                            details="Category_name not found.",
                                        )
                                    )
                                categories.append(category_name)
                            habits.append(
                                {
                                    "task": habit_name,
                                    "categories": categories,
                                    "time": str(duration),
                                    "done": done,
                                }
                            )
            logging.info(
                HTTP_LOG_MESSAGES[200].format(function_name="get_all_habits_data")
            )
            return 200, "Retrieved habits successfully.", habits
        else:
            logging.info(
                HTTP_LOG_MESSAGES[200].format(function_name="get_all_habits_data")
            )
            return 200, "Retrieved 0 habits successfully.", None
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


get_all_habits_data(current_user_id=2)
