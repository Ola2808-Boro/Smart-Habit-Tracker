import logging

from flask import Flask, jsonify, request
from flask_cors import CORS
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


if __name__ == "__main__":
    app.run(debug=True)
