import logging
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS
from notes import read_note
from user import add_user, check_user, select_user

app = Flask(__name__)
CORS(app)


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    result = select_user(data)
    if result:
        return jsonify({"message": "Login successful", "redirect": "/main-page"}), 201
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
def read_notes_for_a_date():
    data = request.json
    date_object = datetime.fromisoformat(data.replace("Z", "+00:00"))
    answer, question = read_note(data)
    if answer is not None and question is not None:
        return (
            jsonify(
                {
                    "message": "correctly downloaded data",
                    "answer": answer,
                    "question": question,
                }
            ),
            201,
        )
    else:
        return (
            jsonify(
                {
                    "message": "incorrectly downloaded data",
                    "answer": answer,
                    "question": question,
                }
            ),
            401,
        )


if __name__ == "__main__":
    app.run(debug=True)
