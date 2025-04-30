import logging
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS
from notes import insert_answer,read_note,get_number_of_questions,select_question
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
    #date_object = datetime.fromisoformat(str(data['calDate']).replace("Z", "+00:00"))
    answer, question = read_note(data['calDate'])
    if answer or question:
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
    else:
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
        

@app.route("/num_of_questions",methods=['GET'])
def get_num_of_questions():
    result=get_number_of_questions()
    if result:
        return (
            jsonify(
                {
                    "message": "correctly downloaded number of questions",
                    "max": result
                }
            ),
            201,
        )
    
        
    else:
        return (
            jsonify(
                {
                    "message": "incorrectly downloaded number of questions",
                    "max": result
                    
                }
            ),
            401,
        )
    
    

@app.route("/get_question",methods=['POST'])
def get_question():
    data = request.json
    result=select_question(question_id=data['random_idx'])
    if result:
        return (
            jsonify(
                {
                    "message": "correctly downloaded number of questions",
                    "question": result,
                    
                }
            ),
            201,
        )
    else:
        return (
            jsonify(
                {
                    "message": "incorrectly downloaded number of questions",
                    "question": result,
                    
                }
            ),
            401,
        )
   
@app.route('/save-answer',methods=["POST"]) 
def save_answer():
    data=request.json
    result=insert_answer(data)
    if result:
        return (
            jsonify(
                {
                    "message": "correctly saved note",
                    
                }
            ),
            201,
        )
    else:
        return (
            jsonify(
                {
                    "message": "problem iwth saving note",
                    
                }
            ),
            401,
        )

if __name__ == "__main__":
    app.run(debug=True)
