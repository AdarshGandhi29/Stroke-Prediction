# 🧠 Stroke Risk Prediction System 🚑

Welcome to the **Stroke Risk Prediction System**! This project leverages machine learning to provide instant stroke risk assessments based on user medical and lifestyle data, with a modern web interface and a robust backend API.

---

## 🚀 Project Overview

This application predicts the risk of stroke using a trained machine learning model. Users can input their health and lifestyle information through a user-friendly web form, and instantly receive a risk assessment along with actionable recommendations.

- **Frontend:** React + TypeScript (Vite, shadcn/ui, Radix UI)
- **Backend:** Python Flask API serving a Decision Tree model
- **ML Model:** Decision Tree Classifier (scikit-learn)

---

## ✨ Features

- 📝 **Interactive Form:** Enter health, demographic, and lifestyle details
- ⚡ **Instant Prediction:** Get real-time stroke risk results
- 📊 **Probability Output:** See the likelihood of stroke (as a percentage)
- 🧬 **ML-Powered:** Uses a trained Decision Tree model for predictions
- 🩺 **Medical Disclaimer:** Reminds users to consult healthcare professionals
- 💡 **Actionable Advice:** Suggestions for next steps based on results

---

## 🖥️ Tech Stack

- **Frontend:** React, TypeScript, Vite, shadcn/ui, Radix UI, Tailwind CSS
- **Backend:** Python, Flask, Flask-CORS, scikit-learn, joblib, pandas, numpy
- **ML Model:** Decision Tree Classifier (pre-trained, loaded via joblib)

---

## 📦 Project Structure

```
Stroke_Prediction/
  ├── backend/           # Flask API & ML model
  │   ├── app.py         # Main backend server
  │   ├── decision_tree_model.joblib  # Trained model
  │   ├── scaler.joblib  # Feature scaler
  │   └── ...
  └── frontend/          # React frontend
      ├── src/
      ├── public/
      └── ...
```

---

## ⚙️ Setup Instructions

### 1. Backend (Flask API)

1. **Navigate to backend:**
   ```sh
   cd backend
   ```
2. **(Optional) Create & activate virtual environment:**
   ```sh
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. **Install dependencies:**
   ```sh
   pip install flask flask-cors scikit-learn pandas numpy joblib
   ```
4. **Run the backend server:**
   ```sh
   python app.py
   ```
   The API will be available at `http://localhost:5000`.

### 2. Frontend (React App)

1. **Navigate to frontend:**
   ```sh
   cd frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   bun install
   ```
3. **Start the frontend dev server:**
   ```sh
   npm run dev
   # or
   bun run dev
   ```
   The app will be available at `http://localhost:8080`.

---

## 🧪 Usage

1. Open the frontend in your browser: [http://localhost:8080](http://localhost:8080)
2. Fill out the form with your health and lifestyle details
3. Click **Predict** to get your stroke risk assessment
4. Review the result and suggested next steps

> ⚠️ **Medical Disclaimer:** This tool is for informational purposes only and does not replace professional medical advice. Always consult a healthcare provider for medical decisions.

---

## 🛠️ Customization & Development

- **Model retraining:** Replace `decision_tree_model.joblib` and `scaler.joblib` in `backend/` with your own trained models.
- **API endpoint:** The frontend expects the backend at `http://localhost:5000/predict` (update in frontend if needed).
- **Styling:** Modify `frontend/src/` for UI changes.

---

## 🙏 Acknowledgements

- Inspired by open-source healthcare and ML communities
- Built for learning, demo, and awareness
