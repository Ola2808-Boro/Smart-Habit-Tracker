import logging
from datetime import datetime

from database.connection_db import create_connection
from database.http_messages import HTTP_LOG_MESSAGES
from psycopg2 import DatabaseError, IntegrityError, OperationalError, ProgrammingError


def read_note(data: dict, current_user_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        if type(data["calDate"]) == list:
            activity_date_start = (
                datetime.strptime(data["calDate"][0], "%Y-%m-%dT%H:%M:%S.%fZ")
                .date()
                .isoformat()
            )
            activity_date_end = (
                datetime.strptime(data["calDate"][1], "%Y-%m-%dT%H:%M:%S.%fZ")
                .date()
                .isoformat()
            )
            ("as", activity_date_start, activity_date_end)
            sql_select_answer_question = """
                SELECT answer,question_id FROM habit_tracker.note WHERE note_id IN (SELECT note_id FROM habit_tracker.activity WHERE activity_date BETWEEN %s AND %s AND note_id IS NOT NULL AND user_id=%s); 
            """
            sql_select_activity_date = """
                SELECT activity_date FROM habit_tracker.activity WHERE activity_date BETWEEN %s AND %s AND note_id IS NOT NULL; 
            """
            cursor.execute(
                sql_select_answer_question,
                (activity_date_start, activity_date_end, current_user_id),
            )
            results = cursor.fetchall()
            cursor.execute(
                sql_select_activity_date, (activity_date_start, activity_date_end)
            )
            results_acitivity_date = cursor.fetchall()
            questions_id, answers, acitivity_dates = [], [], []
            for idx, _ in enumerate(results):
                questions_id.append(results[idx][1])
                answers.append(results[idx][0])
                acitivity_dates.append(results_acitivity_date[idx][0])
            placeholders = ",".join(["%s"] * len(questions_id))
            sql_select_questions = f"""
                SELECT  question_id,question FROM habit_tracker.question WHERE question_id IN ({placeholders}); 
            """
            cursor.execute(sql_select_questions, questions_id)
            questions_results = cursor.fetchall()
            questions_dict = {qid: qtext for qid, qtext in questions_results}
            questions = [questions_dict[qid] for qid in questions_id]
            logging.info(
                f"Answer: {answers}, question: {questions}, questions_id: {questions_id}"
            )
            return answers, questions, acitivity_dates
        else:
            data_dt = datetime.strptime(data["calDate"], "%Y-%m-%dT%H:%M:%S.%fZ")
            activity_date = data_dt.date().isoformat()
            sql_note_id = """
                SELECT note_id FROM habit_tracker.activity WHERE activity_date=%s; 
            """
            cursor.execute(sql_note_id, (activity_date,))
            note_id = cursor.fetchone()
            if note_id is None:
                logging.info(f"No question/answer found for note_id: {note_id}")
                return None, None, None
            logging.info(f"Form date: {activity_date} select note_id:{note_id}")
            sql_select_answer_question = """
                SELECT answer,question_id FROM habit_tracker.note WHERE note_id=%s; 
            """
            cursor.execute(sql_select_answer_question, (note_id,))
            answer, question_id = cursor.fetchone()
            sql_select_question = """
                SELECT question FROM habit_tracker.question WHERE question_id=%s; 
            """
            cursor.execute(sql_select_question, (question_id,))
            question = cursor.fetchone()[0]
            logging.info(
                f"For note_id: {note_id} answer: {answer}, question: {question}"
            )
            return answer, question, activity_date
    except Exception as e:
        logging.info(f"Error: {e}")
        return None, None, None
    finally:
        conn.close()


# add validation by user_id
def get_number_of_questions():
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_num_of_questions = """
            SELECT COUNT(question_id) FROM habit_tracker.question;
        """
        cursor.execute(sql_select_num_of_questions, ())
        num_of_questions = cursor.fetchone()
        if num_of_questions is None:
            logging.info(f"Zero questions in question table")
            return None
        logging.info(f"Number of questions {num_of_questions[0]}")
        return num_of_questions[0]
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()


def select_question(question_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_select_num_of_questions = """
            SELECT question FROM habit_tracker.question WHERE question_id=%s;
        """
        cursor.execute(sql_select_num_of_questions, (question_id,))
        question = cursor.fetchone()
        if question is None:
            logging.info(f"No question with this {question_id} id")
            return None
        return question[0]
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()


def insert_answer(data: dict, current_user_id: int):
    conn = create_connection()
    try:
        cursor = conn.cursor()
        sql_insert_answer = """
            INSERT INTO habit_tracker.note(answer,question_id) VALUES (%s,%s)
            RETURNING note_id;
        """
        cursor.execute(sql_insert_answer, (data["answer"], data["question_id"]))
        note_id = cursor.fetchone()[0]
        sql_update_activity = """
            UPDATE habit_tracker.activity
            SET note_id = %s
            WHERE activity_date = CURRENT_DATE AND user_id = %s;
        """
        cursor.execute(sql_update_activity, (note_id, current_user_id))
        conn.commit()
        logging.info(f"Correctly added note with note_id:{note_id}")
        return 201, "Answer added successfully."
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


def insert_question(data: dict):
    conn = create_connection()
    try:
        sql_insert_question = """
            INSERT INTO habit_tracker.question(question) VALUES(%s)
        """
        cursor = conn.cursor()
        cursor.execute(sql_insert_question, (data["new_question"],))
        conn.commit()
        logging.info(f"Correctly added question")
        return 201, "Correctly added question"
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


def check_answer_exists(current_user_id: int):
    conn = create_connection()
    try:
        sql_insert_question = """
            SELECT note_id,activity_date FROM habit_tracker.activity WHERE activity_date=CURRENT_DATE AND user_id=%s;
        """
        cursor = conn.cursor()
        cursor.execute(sql_insert_question, (current_user_id,))
        note_id, activity_date = cursor.fetchone()
        if note_id:
            logging.info(f"There is already a note for the day :{activity_date}")
            return note_id
        else:
            logging.info(f"Note for the day is null")
            return 200, "Answer exists", True
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
