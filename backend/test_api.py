import requests

# Prompt user for input with ranges/options
print("\nPlease enter the following details as prompted. Valid options/ranges are shown for each field.\n")
gender = input("Enter gender (1 = Male, 0 = Female): ")
age = float(input("Enter age (e.g., 25 to 90): "))
hypertension = int(input("Enter hypertension (1 = Yes, 0 = No): "))
heart_disease = int(input("Enter heart disease (1 = Yes, 0 = No): "))
ever_married = input("Enter ever married (1 = Yes, 0 = No): ")
work_type = input("Enter work type (1 = Private, 2 = Self-employed, 3 = Government, 4 = Child, 5 = Never Worked): ")
residence_type = input("Enter residence type (1 = Urban, 0 = Rural): ")
avg_glucose_level = float(input("Enter average glucose level (mg/dL) (e.g., 80 to 300): "))
bmi = float(input("Enter BMI (e.g., 18.5 to 40): "))
smoking_status = input("Enter smoking status (1 = Formerly smoked, 2 = Smokes, 3 = Never smoked): ")

# Prepare data dictionary
data = {
    "gender": gender,
    "age": age,
    "hypertension": hypertension,
    "heart_disease": heart_disease,
    "ever_married": ever_married,
    "work_type": work_type,
    "Residence_type": residence_type,
    "avg_glucose_level": avg_glucose_level,
    "bmi": bmi,
    "smoking_status": smoking_status
}

# Send POST request to the /predict endpoint
response = requests.post("http://127.0.0.1:5000/predict", json=data)
result = response.json()

# Print the result in the desired format
if result.get("prediction") == 1:
    print("Predicted : Stroke")
else:
    print("Predicted : No Stroke")
print("Prediction Probability:", result.get("probability")) 