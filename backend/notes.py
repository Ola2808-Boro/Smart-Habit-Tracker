import logging

from database.connection_db import create_connection


def read_note(data: dict):
    conn = create_connection()
    try:
        activity_date = data.split("T")[0]
        cursor = conn.cursor()
        sql_note_id = """
            SELECT note_id FROM habit_tracker.activity WHERE activity_date=%s; 
        """
        cursor.execute(sql_note_id, (activity_date,))
        note_id = cursor.fetchone()
        if note_id is None:
            logging.info(f"No question/answer found for note_id: {note_id}")
            return None, None
        logging.info(f"Form date: {activity_date} select note_id:{note_id}")
        sql_select_answer_question = """
            SELECT answer,question_id FROM habit_tracker.note WHERE note_id=%s; 
        """
        cursor.execute(sql_select_answer_question, (note_id,))
        answer,question_id = cursor.fetchone()
        sql_select_question = """
            SELECT question FROM habit_tracker.question WHERE question_id=%s; 
        """
        cursor.execute(sql_select_question, (question_id,))
        question= cursor.fetchone()
        logging.info(
            f"For note_id: {note_id} answer: {answer}, question: {question}"
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
        
def insert_answer(data:dict):
    conn=create_connection()
    try:
        cursor=conn.cursor()
        sql_insert_answer="""
            INSERT INTO habit_tracker.note(answer,question_id) VALUES (%s,%s)
            RETURNING note_id;
        """
        cursor.execute(sql_insert_answer,(data['answer'],data['question_id']))
        note_id=cursor.fetchone()[0]
        conn.commit()
        logging.info(f'Correctly added note with note_id:{note_id}')
        return True
    except Exception as e:
        logging.info(f"Error: {e}")
        return None
    finally:
        conn.close()