import logging

from database.connection_db import create_connection


def read_note(data: dict):
    conn = create_connection()
    try:
        activity_date = data.split("T")[0]
        cursor = conn.cursor()
        sql_thought_id = """
            SELECT thought_id FROM habit_tracker.activity WHERE activity_date=%s; 
        """
        cursor.execute(sql_thought_id, (activity_date,))
        thought_id = cursor.fetchone()
        if thought_id is None:
            logging.info(f"No question/answer found for thought_id: {thought_id}")
            return None, None
        logging.info(f"Form date: {activity_date} select thought_id:{thought_id}")
        sql_select_answer_question = """
            SELECT question_id,answer_id FROM habit_tracker.thought WHERE thought_id=%s; 
        """
        cursor.execute(sql_select_answer_question, (thought_id,))
        question_id, answer_id = cursor.fetchone()
        sql_select_question = """
            SELECT question FROM habit_tracker.question WHERE question_id=%s; 
        """
        sql_select_answer = """
            SELECT answer FROM habit_tracker.answer WHERE answer_id=%s; 
        """
        cursor.execute(sql_select_answer, (answer_id,))
        answer = cursor.fetchone()[0]
        cursor.execute(sql_select_question, (question_id,))
        question = cursor.fetchone()[0]
        logging.info(
            f"For thought_id: {thought_id} answer: {answer}, question: {question}"
        )
        return answer, question
    except Exception as e:
        logging.info(f"Error: {e}")
        return None, None
    finally:
        conn.close()

def get_number_of_questions():
    conn=create_connection()
    try:
        cursor=conn.cursor()
        sql_select_num_of_questions="""
            SELECT COUNT(question_id) FROM habit_tracker.question;
        """
        cursor.execute(sql_select_num_of_questions,())
        num_of_questions=cursor.fetchone()
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
        
def select_question(question_id:int):
    conn=create_connection()
    try:
        cursor=conn.cursor()
        sql_select_num_of_questions="""
            SELECT question FROM habit_tracker.question WHERE question_id=%s;
        """
        cursor.execute(sql_select_num_of_questions,(question_id,))
        question=cursor.fetchone()
        if question is None:
            logging.info(f"No question with this {question_id} id")
            return None
        return question[0]
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()
        