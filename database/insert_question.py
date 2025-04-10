import logging
import os
import re

import requests
from bs4 import BeautifulSoup
from connection_db import create_connection


def get_questions():
    URL = "https://www.usa.edu/blog/self-discovery-questions/"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    p_elements = soup.find_all("p")
    questions = [
        (element,)
        for p_element in p_elements
        if re.search(r"^\d+\..*\?", p_element.text)
        for element in p_element.text.split("\n")
    ]
    return questions


def insert_questions_into_table():
    conn = create_connection()
    if conn:
        try:
            questions = get_questions()
            cursor = conn.cursor()
            insert_query = """
                INSERT INTO habit_tracker.question(question) VALUES(%s);
            """
            cursor.executemany(insert_query, questions)
            conn.commit()
            cursor.close()
            logging.info(f"Added data to question table")
        except Exception as e:
            logging.info(f"Error: {e}")
        finally:
            conn.close()
