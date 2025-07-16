import logging
from collections import Counter
from datetime import datetime, timedelta

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

                        category_ids = get_category_id_by_habit_id(
                            cursor=cursor,
                            current_user_id=current_user_id,
                            habit_id=habit_id,
                        )
                        if category_ids:

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
                                    "duration": str(duration),
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


def get_category_statistics(current_user_id):
    code, message, data = get_all_habits_data(current_user_id=current_user_id)
    if data:
        categories_data = {}
        categories_frequency = []
        for item in data:
            categories = item["categories"]
            duration_str = item["duration"]
            h, m, s = map(int, duration_str.split(":"))
            duration = timedelta(hours=h, minutes=m, seconds=s)
            for category in categories:
                categories_frequency.append(category)
                if category not in list(categories_data.keys()):
                    categories_data.update({category: duration})
                else:

                    categories_data[category] += duration

        for category, duration in categories_data.items():
            categories_data[category] = format_duration(duration)
        counter = Counter(categories_frequency)

        sorted_categories_data = sorted(categories_data.items(), key=lambda x: x[1])
        return (
            code,
            message,
            [sorted_categories_data, [list(counter.keys()), list(counter.values())]],
        )
    else:
        code, message, data


def format_duration(td: timedelta):
    total_seconds = int(td.total_seconds())
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60

    if hours > 0 and minutes > 0:
        return f"{hours} h {minutes} min"
    elif hours > 0:
        return f"{hours} h"
    else:
        return f"{minutes} min"


# _, _, results = get_all_habits_data(current_user_id=2)
# get_category_statistics(results)
