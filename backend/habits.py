import logging

from database.connection_db import create_connection
from database.http_messages import HTTP_LOG_MESSAGES
from psycopg2 import DatabaseError, IntegrityError, OperationalError, ProgrammingError


def get_habit_id(cursor, user_id: int, habit_name: str):
    cursor.execute(
        "SELECT habit_id FROM habit_tracker.habit WHERE user_id=%s AND habit_name=%s",
        (user_id, habit_name),
    )
    row = cursor.fetchone()
    if row:
        return row[0]
    logging.warning("Habit not found")
    return None


def get_habit_tracker_detail_id(cursor, current_user_id: int, selectedDate):
    sql_select_habit_tracker_detail_id = """
        SELECT habit_tracker_detail_id from habit_tracker.activity WHERE user_id=%s AND activity_date=%s
    """
    cursor.execute(sql_select_habit_tracker_detail_id, (current_user_id, selectedDate))
    row = cursor.fetchone()
    if row:
        return row[0]
    logging.warning("Habit_tracker_detail_id not found")
    return None


def get_category_id(cursor, current_user_id: int, category: str):
    sql_select_all_category_id = """
        SELECT category_id FROM habit_tracker.category WHERE user_id=%s AND category_name=%s
    """
    cursor.execute(sql_select_all_category_id, (current_user_id, category))
    row = cursor.fetchone()
    if row:
        return row[0]
    logging.warning("Category_id not found")
    return None


def get_category_id_by_habit_id(cursor, current_user_id: int, habit_id: int):
    sql_select_all_category_id = """
        SELECT category_id FROM habit_tracker.habit_category WHERE user_id=%s AND habit_id=%s
    """
    cursor.execute(sql_select_all_category_id, (current_user_id, habit_id))
    row = cursor.fetchall()
    if row:
        return row
    logging.warning("Category_id not found")
    return None


def get_category_name(cursor, current_user_id: int, category_id: int):
    sql_select_all_category_name = """
        SELECT category_name FROM habit_tracker.category WHERE user_id=%s AND category_id=%s
    """
    cursor.execute(sql_select_all_category_name, (current_user_id, category_id))
    row = cursor.fetchone()
    if row:
        return row[0]
    logging.warning("Category_id not found")
    return None


def get_habit_name(cursor, current_user_id: int, habit_id: int):
    sql_select_all_habit = """
            SELECT habit_name FROM habit_tracker.habit WHERE user_id=%s AND habit_id=%s
    """
    cursor.execute(sql_select_all_habit, (current_user_id, habit_id))
    row = cursor.fetchone()
    if row:
        return row[0]
    logging.warning("Habit_name not found")
    return None


def save_category(data: dict, current_user_id: int):
    conn = create_connection()
    try:
        if not data.get("category"):
            logging.warning(
                HTTP_LOG_MESSAGES[400].format(
                    function_name="save_category", details="Missing ''category'"
                )
            )
            return 400, "Missing 'category' in request."
        cursor = conn.cursor()
        sql_select_all_category = """
            SELECT category_name FROM habit_tracker.category WHERE user_id=%s
        """
        cursor.execute(sql_select_all_category, (current_user_id,))
        results = cursor.fetchall()
        if data["category"] in [item[0] for item in results]:
            logging.warning(
                HTTP_LOG_MESSAGES[409].format(
                    function_name="save_category", details="Category already exists."
                )
            )
            return 409, "Category already exists."
        else:
            sql_insert_category = """
                INSERT INTO habit_tracker.category(category_name,user_id) VALUES(%s,%s)
            """
            cursor.execute(sql_insert_category, (data["category"], current_user_id))
            conn.commit()
            logging.info(HTTP_LOG_MESSAGES[201].format(function_name="save_category"))
            return 201, "Category added successfully."
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


def save_habit(data: dict, current_user_id: int):
    conn = create_connection()
    try:
        if not data.get("habit"):
            logging.warning(
                HTTP_LOG_MESSAGES[400].format(
                    function_name="save_habit", details="Missing 'habit'"
                )
            )
            return 400, "Missing 'habit' or in request."
        cursor = conn.cursor()
        sql_select_all_habit = """
            SELECT habit_name FROM habit_tracker.habit WHERE user_id=%s
        """
        cursor.execute(sql_select_all_habit, (current_user_id,))
        results = cursor.fetchall()
        if data["habit"] in [item[0] for item in results]:
            logging.warning(
                HTTP_LOG_MESSAGES[409].format(
                    function_name="save_habit", details="Habit already exists."
                )
            )
            return 409, "Habit already exists."
        else:
            sql_insert_habit = """
                INSERT INTO habit_tracker.habit(habit_name,user_id) VALUES(%s,%s)
                RETURNING habit_id;
            """
            cursor.execute(sql_insert_habit, (data["habit"], current_user_id))
            habit_id = cursor.fetchone()[0]
            habit_category_data = []
            for category in data["category"]:
                if category == []:
                    habit_category_data.append((habit_id, None, current_user_id))
                else:
                    category_id = get_category_id(cursor, current_user_id, category)
                    if category_id is None:
                        logging.warning(
                            HTTP_LOG_MESSAGES[404].format(
                                function_name="save_habit",
                                details="Category_id not found.",
                            )
                        )
                        return 404, "Category_id not found."
                    habit_category_data.append((habit_id, category_id, current_user_id))
            sql_insert_habit_category = """
                INSERT INTO habit_tracker.habit_category(habit_id,category_id,user_id) VALUES(%s,%s,%s)
                RETURNING habit_id;
            """
            cursor.executemany(sql_insert_habit_category, habit_category_data)
            conn.commit()
            logging.info(HTTP_LOG_MESSAGES[201].format(function_name="save_habit"))
            return 201, "Habit added successfully."
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


def get_category(current_user_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_all_category = """
            SELECT category_name FROM habit_tracker.category WHERE user_id=%s
        """
        cursor.execute(sql_select_all_category, (current_user_id,))
        results = cursor.fetchall()
        if not results:
            logging.info("No categories found for user_id=%s", current_user_id)
            return 204, "No categories found.", []
        logging.info(HTTP_LOG_MESSAGES[200].format(function_name="get_category"))
        return 200, "Retrieved category successfully.", [item for item in results]
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


def get_habit(current_user_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_all_habit = """
            SELECT habit_id,habit_name FROM habit_tracker.habit WHERE user_id=%s
        """
        cursor.execute(sql_select_all_habit, (current_user_id,))
        habit_results = cursor.fetchall()
        print(f"habit_results: {habit_results}")
        habits_data = []

        for result in habit_results:
            categories = []
            print(f"results:{result}")
            habit_id, habit_name = result[0], result[1]
            category_id_results = get_category_id_by_habit_id(
                cursor, current_user_id, habit_id
            )
            # handle this exception
            if category_id_results is None:
                logging.warning(
                    HTTP_LOG_MESSAGES[204].format(
                        function_name="get_habit",
                        details="Category_id_results not found.",
                    )
                )
                # return 204, "Category_id_results not found.", []
            else:
                for category_id in category_id_results:
                    category_name = get_category_name(
                        cursor, current_user_id, category_id
                    )
                    if category_name is None:
                        logging.warning(
                            HTTP_LOG_MESSAGES[204].format(
                                function_name="get_habit",
                                details="Category_name not found.",
                            )
                        )
                        # return 204, "Category_name not found.", None
                    categories.append(category_name)
            habits_data.append({"habit": habit_name, "categories": categories})
            print(f"habits_data: {habits_data}")
        logging.info(HTTP_LOG_MESSAGES[200].format(function_name="get_habit"))
        return 200, "Retrieved habit successfully.", habits_data
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


def get_task(data: dict, current_user_id: int):
    conn = create_connection()
    try:
        if not data.get("selectedDate"):
            logging.warning(
                HTTP_LOG_MESSAGES[400].format(
                    function_name="get_task", details="Missing 'selectedDate'"
                )
            )
            return 400, "Missing 'selectedDate' in request."
        cursor = conn.cursor()
        habit_tracker_detail_id = get_habit_tracker_detail_id(
            cursor, current_user_id, data["selectedDate"]
        )
        if habit_tracker_detail_id is None:
            logging.warning(
                HTTP_LOG_MESSAGES[204].format(
                    function_name="get_task",
                    details="Habit_tracker_detail_id not found.",
                )
            )
            return 204, "Habit_tracker_detail_id not found.", None
        sql_select_habit_id = """
        SELECT habit_id,duration,done FROM habit_tracker.habit_tracker WHERE  habit_tracker_detail_id=%s
        """
        cursor.execute(sql_select_habit_id, (habit_tracker_detail_id,))
        habit_id_duration_results = cursor.fetchall()
        if habit_id_duration_results == []:
            logging.warning(
                HTTP_LOG_MESSAGES[204].format(
                    function_name="get_task",
                    details="Results not found.",
                )
            )
            return 204, "Results not found.", []
        tasks_data = []
        for habit_id, duration, done in habit_id_duration_results:
            habit_name = get_habit_name(cursor, current_user_id, habit_id)
            if habit_name is None:
                logging.warning(
                    HTTP_LOG_MESSAGES[404].format(
                        function_name="get_task", details="Habit_name not found."
                    )
                )
                return 404, "Habit_name not found.", None
            category_id_results = get_category_id_by_habit_id(
                cursor, current_user_id, habit_id
            )
            categories = []
            if category_id_results is None:
                logging.warning(
                    HTTP_LOG_MESSAGES[404].format(
                        function_name="get_task",
                        details="Category_id_results not found.",
                    )
                )
            else:
                for category_id in category_id_results:
                    category_name = get_category_name(
                        cursor, current_user_id, category_id
                    )
                    if category_name is None:
                        logging.warning(
                            HTTP_LOG_MESSAGES[404].format(
                                function_name="get_task",
                                details="Category_name not found.",
                            )
                        )
                        return 404, "Category_name not found.", None
                    categories.append(category_name)

            tasks_data.append(
                {
                    "task": habit_name,
                    "categories": categories,
                    "time": str(duration),
                    "done": done,
                }
            )
        logging.info(HTTP_LOG_MESSAGES[200].format(function_name="get_task"))
        return 200, "Retrieved task successfully.", tasks_data
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


def save_task(data: dict, current_user_id: int):
    print(f"save task data:{data}")
    conn = create_connection()
    try:
        if not data.get("task") or not data.get("time"):
            logging.warning(
                HTTP_LOG_MESSAGES[400].format(
                    function_name="save_task", details="Missing 'task' or 'time'"
                )
            )
            return 400, "Missing 'task' or 'time' in request."
        cursor = conn.cursor()
        habit_id = get_habit_id(
            cursor=cursor, user_id=current_user_id, habit_name=data["task"]
        )
        if habit_id is None:
            logging.warning(
                HTTP_LOG_MESSAGES[404].format(
                    function_name="save_task", details="Habit not found."
                )
            )
            return 404, "Habit not found."
        habit_tracker_detail_id = get_habit_tracker_detail_id(
            cursor, current_user_id, data["date"]
        )
        if habit_tracker_detail_id is None:
            logging.warning(
                HTTP_LOG_MESSAGES[404].format(
                    function_name="save_task",
                    details="Habit_tracker_detail_id not found.",
                )
            )
            return 404, "Habit_tracker_detail_id not found."
        if data["time"] == "0:00:00":
            sql_upsert = """
                INSERT INTO habit_tracker.habit_tracker(habit_id,duration,habit_tracker_detail_id,done)
                VALUES(%s,%s,%s,%s)
            """
            cursor.execute(
                sql_upsert,
                (habit_id, data["time"], habit_tracker_detail_id, data["done"]),
            )
            logging.info(
                HTTP_LOG_MESSAGES[201].format(function_name="save_task-insert")
            )
        else:
            sql_update = """
                UPDATE habit_tracker.habit_tracker SET duration=%s, done=%s
                WHERE habit_id=%s AND habit_tracker_detail_id=%s
            """
            cursor.execute(
                sql_update,
                (data["time"], data["done"], habit_id, habit_tracker_detail_id),
            )
            logging.info(
                HTTP_LOG_MESSAGES[201].format(function_name="save_task-update")
            )
        conn.commit()
        return 201, "Task added successfully."
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


def remove_task(data: dict, current_user_id: int):
    conn = create_connection()
    try:
        if not data.get("task") or not data.get("selectedDate"):
            logging.warning(
                HTTP_LOG_MESSAGES[400].format(
                    function_name="remove_task",
                    details="Missing 'task' or 'category' or 'selectedDate'",
                )
            )
            return 400, "Missing 'task' or 'category' or 'selectedDate' in request."
        cursor = conn.cursor()
        sql_select_habit_tracker_detail_id = """
            SELECT habit_tracker_detail_id from habit_tracker.activity WHERE user_id=%s AND activity_date=%s
        """
        cursor.execute(
            sql_select_habit_tracker_detail_id, (current_user_id, data["selectedDate"])
        )
        habit_tracker_detail_id = cursor.fetchone()[0]
        habit_id = get_habit_id(
            cursor=cursor, user_id=current_user_id, habit_name=data["task"]
        )
        if habit_id is None:
            logging.warning(
                HTTP_LOG_MESSAGES[404].format(
                    function_name="remove_task", details="Habit not found."
                )
            )
            return 404, "Habit not found."
        sql_delete_habit = """
            DELETE FROM habit_tracker.habit_tracker WHERE   habit_tracker_detail_id=%s AND habit_id=%s
        """
        cursor.execute(sql_delete_habit, (habit_tracker_detail_id, habit_id))
        conn.commit()
        logging.info(HTTP_LOG_MESSAGES[200].format(function_name="remove_task"))
        return 200, "Habit removed successfully."
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
