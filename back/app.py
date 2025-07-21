from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import sqlite3
from models import (
    init_db, save_main_image, get_main_image,
    save_problem, get_problem
)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/upload_main_image", methods=['POST'])
def upload_main_image():
    file = request.files['image']
    if not file:
        return jsonify({"error": "No file uploaded"}), 400
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    save_main_image(filename)
    return jsonify({"message": "Main image uploaded successfully", "filename": filename})

@app.route("/get_main_image", methods=["GET"])
def get_main_image_route():
    filename = get_main_image()
    return jsonify({"filename": filename})

@app.route("/upload_problem/<int:problem_id>", methods=['POST'])
def upload_problem(problem_id):
    question = request.form.get('question')
    answer = request.form.get('answer')  
    link = request.form.get('link')
    image_file = request.files.get('image')

    filename = None
    if image_file:
        filename = secure_filename(image_file.filename)
        image_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    save_problem(problem_id, question, answer, filename, link)
    return jsonify({"message": f"문제 {problem_id} 저장 완료"})

@app.route("/get_problem/<int:problem_id>", methods=["GET"])
def get_problem_route(problem_id):
    row = get_problem(problem_id)
    if row:
        return jsonify({
            "question": row[0],
            "answer": row[1],
            "image": row[2],
            "link": row[3]
        })
    else:
        return jsonify({"error": "Not found"}), 404

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
