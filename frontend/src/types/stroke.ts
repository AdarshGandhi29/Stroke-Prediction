
export interface StrokePredictionData {
  gender: string;
  age: number;
  hypertension: number;
  heart_disease: number;
  ever_married: string;
  work_type: string;
  residence_type: string;
  avg_glucose_level: number;
  bmi: number;
  smoking_status: string;
}

export interface PredictionResult {
  prediction: number;
  probability?: number;
  message?: string;
  error?: string;
}

export interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}
