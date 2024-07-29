from flask import current_app as app
from flask import jsonify

@app.route('/')
def home():
    return jsonify(message="Welcome to the Breast Cancer Detector Backend")
