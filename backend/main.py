import logging
import os
from datetime import datetime
from functools import wraps

import jwt
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from habits import (
    get_category,
    get_habit,
    get_task,
    remove_task,
    save_category,
    save_habit,
    save_task,
    weakly_progress_stats,
)
from mood import (
    get_mood_option,
    insert_new_mood_option,
    retrieved_mood_data,
    update_user_mood,
)
from notes import (
    check_answer_exists,
    get_number_of_questions,
    insert_answer,
    insert_question,
    read_note,
    select_question,
)
from user import add_user, check_user, check_user_joined_date, select_user

app = Flask(__name__)
CORS(app)
load_dotenv()
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")


def token_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"]
        if not token:
            return jsonify({"message": "Token is missing!"}), 401
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms="HS256")
            current_user_id = data["user_id"]
        except:
            return jsonify({"message": "Token is invalid!"}), 401
        return func(current_user_id, *args, **kwargs)

    return wrapper


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    code, message, result = select_user(data)
    if result:
        token = jwt.encode(
            {"user_id": result[0]}, app.config["SECRET_KEY"], algorithm="HS256"
        )
        return (
            jsonify(
                {
                    "message": "Login successful",
                    "redirect": "/main-page",
                    "token": token,
                }
            ),
            201,
        )
    else:
        return jsonify({"message": "Invalid credentials"}), 201


@app.route("/sign-up", methods=["POST"])
def sign_up():
    data = request.json
    code, message, results = check_user(data)
    if results:
        return jsonify({"message": message}), code
    else:
        code, message, results = add_user(data)
        return jsonify({"message": message}), code


@app.route("/notes-read", methods=["POST"])
@token_required
def read_notes_for_a_date(current_user_id: int):
    data = request.json
    code, message, results = read_note(data, current_user_id)
    answer_question_date = []

    if len(results) > 0:
        answer_question_date = [
            [results[0][i], results[1][i], results[2][i]]
            for i in range(len(results[0]))
        ]
    return (
        jsonify({"message": message, "answer_question_date": answer_question_date}),
        code,
    )


@app.route("/num_of_questions", methods=["GET"])
@token_required
def get_num_of_questions(current_user_id: int):
    code, message, results = get_number_of_questions(current_user_id)
    return jsonify({"message": message, "num_of_questions": results}), code


@app.route("/get_question", methods=["POST"])
def get_question():
    data = request.json
    code, message, results = select_question(question_id=data["random_idx"])
    return jsonify({"message": message, "question": results}), code


@app.route("/save-answer", methods=["POST"])
@token_required
def save_answer(current_user_id: int):
    data = request.json
    code, message = insert_answer(data, current_user_id)
    return jsonify({"message": message}), code


@app.route("/add-question", methods=["POST"])
@token_required
def add_qestion(current_user_id: int):
    data = request.json
    code, message = insert_question(data, current_user_id)
    return jsonify({"message": message}), code


@app.route("/check-answer-exists", methods=["GET"])
@token_required
def check_answer(current_user_id: int):
    code, message, results = check_answer_exists(current_user_id)
    return jsonify({"message": message, "exists": results}), code


@app.route("/check-joined-date", methods=["GET"])
@token_required
def check_joined_date(current_user_id: int):
    code, message, results = check_user_joined_date(current_user_id=current_user_id)
    return jsonify({"message": message, "date_join": results}), code


@app.route("/add-new-mood-option", methods=["POST"])
@token_required
def add_new_mood_option(current_user_id: int):
    data = request.json
    code, message = insert_new_mood_option(data, current_user_id)
    return jsonify({"message": message}), code


@app.route("/update-mood", methods=["POST"])
@token_required
def update_mood(current_user_id: int):
    data = request.json
    code, message = update_user_mood(data=data, current_user_id=current_user_id)
    return jsonify({"message": message}), code


@app.route("/retrieved-mood-data", methods=["GET"])
@token_required
def retrieved_mood(current_user_id: int):
    code, message, results = retrieved_mood_data(current_user_id=current_user_id)
    return jsonify({"message": message, "mood": results}), code


@app.route("/get-mood-option", methods=["GET"])
@token_required
def retrieved_mood_option(current_user_id: int):
    code, message, results = get_mood_option(current_user_id=current_user_id)
    return jsonify({"message": message, "mood": results}), code


# Habits+tasks
@app.route("/save-category", methods=["POST"])
@token_required
def saving_category(current_user_id: int):
    data = request.json
    code, message = save_category(data=data, current_user_id=current_user_id)
    return jsonify({"message": message}), code


@app.route("/save-habit", methods=["POST"])
@token_required
def saving_habit(current_user_id: int):
    data = request.json
    code, message = save_habit
    return jsonify({"message": message}), code


@app.route("/get-category", methods=["GET"])
@token_required
def retrieved_category(current_user_id: int):
    code, message, results = get_category(current_user_id=current_user_id)
    return jsonify({"message": message, "category": results}), code


@app.route("/get-habit", methods=["GET"])
@token_required
def retrieved_habit(current_user_id: int):
    code, message, results = get_habit(current_user_id=current_user_id)
    return jsonify({"message": message, "habit": results}), code


@app.route("/get-task", methods=["POST"])
@token_required
def retrieved_task(current_user_id: int):
    data = request.json
    code, message, results = get_task(data=data, current_user_id=current_user_id)
    return jsonify({"message": message, "task": results}), code


@app.route("/save-task", methods=["POST"])
@token_required
def saving_task(current_user_id: int):
    data = request.json
    code, message = save_task(data=data, current_user_id=current_user_id)
    return jsonify({"message": message}), code


@app.route("/remove-task", methods=["POST"])
@token_required
def removing_task(current_user_id: int):
    data = request.json
    code, message = remove_task(data=data, current_user_id=current_user_id)
    return jsonify({"message": message}), code


@app.route("/weakly-progress-stats", methods=["POST"])
@token_required
def removing_weakly_progress_stats(current_user_id: int):
    data = request.json
    code, message, progress_rates = weakly_progress_stats(
        data=data, current_user_id=current_user_id
    )
    return jsonify({"message": message, "progress_rates": progress_rates}), code


if __name__ == "__main__":
    app.run(debug=True)
