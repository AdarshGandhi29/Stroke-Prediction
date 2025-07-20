from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

# Load model and scaler
model = joblib.load('decision_tree_model.joblib')
scaler = joblib.load('scaler.joblib')

# Label encoding mappings (from notebook)
gender_map = {'Male': 1, 'Female': 0}
ever_married_map = {'Yes': 1, 'No': 0}
work_type_map = {
    'Private': 1,
    'Self-employed': 2,
    'Govt_job': 3,
    'children': 4,
    'Never_worked': 5,
    'Government': 3,  # in case of alternate spelling
    'Child': 4        # in case of alternate spelling
}
residence_type_map = {'Urban': 1, 'Rural': 0}
smoking_status_map = {
    'formerly smoked': 1,
    'smokes': 2,
    'never smoked': 3,
    'Unknown': 0
}

def preprocess_input(data):
    # Map categorical values
    gender = gender_map.get(data.get('gender'), 0)
    age = float(data.get('age', 0))
    hypertension = int(data.get('hypertension', 0))
    heart_disease = int(data.get('heart_disease', 0))
    ever_married = ever_married_map.get(data.get('ever_married'), 0)
    work_type = work_type_map.get(data.get('work_type'), 1)
    residence_type = residence_type_map.get(data.get('residence_type'), 0)  # fixed key
    avg_glucose_level = float(data.get('avg_glucose_level', 0))
    bmi = float(data.get('bmi', 0))
    smoking_status = smoking_status_map.get(data.get('smoking_status'), 0)

    # Create DataFrame
    input_df = pd.DataFrame({
        'gender': [gender],
        'age': [age],
        'hypertension': [hypertension],
        'heart_disease': [heart_disease],
        'ever_married': [ever_married],
        'work_type': [work_type],
        'Residence_type': [residence_type],
        'avg_glucose_level': [avg_glucose_level],
        'bmi': [bmi],
        'smoking_status': [smoking_status]
    })
    # Scale
    input_scaled = scaler.transform(input_df)
    return input_scaled

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        processed = preprocess_input(data)
        prediction = model.predict(processed)[0]
        proba = model.predict_proba(processed)[0].tolist()
        result = {
            'prediction': int(prediction),
            'probability': proba
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True) 