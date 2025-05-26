import logging
import os
from datetime import datetime
from functools import wraps
from habits import get_task,remove_task,save_task,insert_category, insert_habit, get_category,get_habit
from mood import insert_new_mood_option, update_user_mood, retrieved_mood_data, get_mood_option
import jwt
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from notes import (
    check_answer_exists,
    get_number_of_questions,
    insert_answer,
    insert_question,
    read_note,
    select_question,
)
from user import add_user, check_user, select_user, check_user_joined_date

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
    result = select_user(data)
    if result:
        token = jwt.encode(
            {"user_id": result[0]}, app.config["SECRET_KEY"], algorithm="HS256"
        )
        return jsonify({
            "message": "Login successful",
            "redirect": "/main-page",
            "token": token,
        }), 201
    else:
        return jsonify({"message": "Invalid credentials"}), 201


@app.route("/sign-up", methods=["POST"])
def sign_up():
    data = request.json
    if not check_user(data):
        return jsonify({"message": "Account already exists"}), 201
    else:
        result = add_user(data)
        if result:
            return jsonify({"message": "User created", "redirect": "/"}), 201
        else:
            return jsonify({"message": "Invalid credentials"}), 401


@app.route("/notes-read", methods=["POST"])
@token_required
def read_notes_for_a_date(current_user_id: int):
    data = request.json
    answer, question, activity_date = read_note(data, current_user_id)
    answer_question_date = [[question[i], answer[i], activity_date[i]] for i in range(len(answer))]
    if answer or question:
        return jsonify({
            "message": "Data retrieved successfully",
            "answer_question_date": answer_question_date,
        }), 201
    else:
        return jsonify({
            "message": "Failed to retrieve data",
            "answer_question_date": answer_question_date,
        }), 401


@app.route("/num_of_questions", methods=["GET"])
def get_num_of_questions():
    result = get_number_of_questions()
    if result:
        return jsonify({"message": "Number of questions retrieved successfully", "max": result}), 201
    else:
        return jsonify({"message": "Failed to retrieve number of questions", "max": result}), 401


@app.route("/get_question", methods=["POST"])
def get_question():
    data = request.json
    result = select_question(question_id=data["random_idx"])
    if result:
        return jsonify({"message": "Data retrieved successfully", "question": result}), 201
    else:
        return jsonify({"message": "Failed to retrieve data", "question": result}), 401


@app.route("/save-answer", methods=["POST"])
@token_required
def save_answer(current_user_id: int):
    data = request.json
    result = insert_answer(data, current_user_id)
    if result:
        return jsonify({"message": "Note saved successfully"}), 201
    else:
        return jsonify({"message": "Failed to save note"}), 401


@app.route("/add-question", methods=["POST"])
def add_qestion():
    data = request.json
    result = insert_question(data)
    if result:
        return jsonify({"message": "Question added successfully"}), 201
    else:
        return jsonify({"message": "Failed to add question"}), 401


@app.route("/check-answer-exists", methods=["GET"])
@token_required
def check_answer(current_user_id: int):
    result = check_answer_exists(current_user_id)
    if type(result) == int:
        return jsonify({"message": "A note already exists for this date"}), 201
    elif result is True:
        return jsonify({"message": "A note has note_id null"}), 201
    else:
        return jsonify({"message": "No note found for this date"}), 401


@app.route("/check-joined-date", methods=["GET"])
@token_required
def check_joined_date(current_user_id: int):
    result = check_user_joined_date(current_user_id=current_user_id)
    if result:
        return jsonify({"message": "Joined date found for user", "date_join": result}), 201
    else:
        return jsonify({"message": "Joined date not found for user"}), 401


@app.route('/add-new-mood-option', methods=['POST'])
@token_required
def add_new_mood_option(current_user_id: int):
    data = request.json
    result = insert_new_mood_option(data, current_user_id)
    if result:
        return jsonify({'message': 'Mood option added successfully'}), 201
    else:
        return jsonify({'message': 'Failed to add mood option'}), 401


@app.route("/update-mood", methods=["POST"])
@token_required
def update_mood(current_user_id: int):
    data = request.json
    result = update_user_mood(data=data, current_user_id=current_user_id)
    if result:
        return jsonify({'message': 'Mood updated successfully', 'date_join': result}), 201
    else:
        return jsonify({'message': 'Failed to update mood'}), 401


@app.route("/retrieved-mood-data", methods=["GET"])
@token_required
def retrieved_mood(current_user_id: int):
    result = retrieved_mood_data(current_user_id=current_user_id)
    if result:
        return jsonify({'message': 'Retrieved mood successfully', 'mood_data': result}), 201
    else:
        return jsonify({'message': 'Failed to retrieve mood data'}), 201


@app.route("/get-mood-option", methods=["GET"])
@token_required
def retrieved_mood_option(current_user_id: int):
    result = get_mood_option(current_user_id=current_user_id)
    if result:
        return jsonify({'message': 'Retrieved mood option successfully', 'mood_option': result}), 201
    else:
        return jsonify({'message': 'Failed to retrieve mood data'}), 401


@app.route("/add-category", methods=["POST"])
@token_required
def add_category(current_user_id: int):
    data = request.json
    result = insert_category(data=data, current_user_id=current_user_id)
    if result:
        return jsonify({'message': 'Added successfully category'}), 201
    elif result is False:
        return jsonify({'message': 'Category already exists'}), 201
    else:
        return jsonify({'message': 'Failed to add category'}), 401


@app.route("/add-habit", methods=["POST"])
@token_required
def add_habit(current_user_id: int):
    data = request.json
    result = insert_habit(data=data, current_user_id=current_user_id)
    if result:
        return jsonify({'message': 'Added successfully habit'}), 201
    elif result is False:
        return jsonify({'message': 'Habit already exists'}), 201
    else:
        return jsonify({'message': 'Failed to add habit'}), 401


@app.route("/get-category", methods=["GET"])
@token_required
def retrieved_category(current_user_id: int):
    result = get_category(current_user_id=current_user_id)
    if result:
        return jsonify({'message': 'Retrieved category successfully', 'category': result}), 201
    else:
        return jsonify({'message': 'Failed to retrieve category data'}), 401

@app.route("/get-habit", methods=["GET"])
@token_required
def retrieved_habit(current_user_id: int):
    result = get_habit(current_user_id=current_user_id)
    if result:
        return jsonify({'message': 'Retrieved habit successfully', 'habit': result}), 201
    else:
        return jsonify({'message': 'Failed to retrieve habbit data'}), 401

@app.route("/get-task", methods=["GET"])
@token_required
def retrieved_task(current_user_id: int):
    result = get_task(current_user_id=current_user_id)
    if result or result==[]:
        return jsonify({'message': 'Retrieved task successfully', 'task': result}), 201
    else:
        return jsonify({'message': 'Failed to retrieve tasks data'}), 401


@app.route("/save-task", methods=["POST"])
@token_required
def saving_task(current_user_id: int):
    data=request.json
    result = save_task(data=data,current_user_id=current_user_id)
    if result:
        return jsonify({'message': 'Saved habit successfully'}), 201
    else:
        return jsonify({'message': 'Failed to save habbit'}), 401


@app.route("/remove-task", methods=["POST"])
@token_required
def removing_task(current_user_id: int):
    data=request.json
    result = remove_task(data=data,current_user_id=current_user_id)
    if result:
        return jsonify({'message': 'Removed habit successfully'}), 201
    else:
        return jsonify({'message': 'Failed to emove habbit'}), 401


if __name__ == "__main__":
    app.run(debug=True)