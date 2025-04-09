import re

import requests
from bs4 import BeautifulSoup


def get_questions():
    URL = "https://www.usa.edu/blog/self-discovery-questions/"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    p_elements = soup.find_all("p")
    questions = [
        p_element.text
        for p_element in p_elements
        if re.search(r"^\d+\..*\?", p_element.text)
    ]
