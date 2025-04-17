from database.connection_db import create_connection
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    conn = create_connection()
    cursor = conn.cursor()
    sql_select_user = """
        SELECT * FROM habit_tracker.user WHERE email=%s AND password_hash=%s;
    """
    cursor.execute(sql_select_user, (data["email"], data["password"]))
    result = cursor.fetchone()
    conn.close()
    if result:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


if __name__ == "__main__":
    app.run(debug=True)
