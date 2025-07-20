
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StrokePredictionData, PredictionResult } from "@/types/stroke";
import FormField from "./FormField";
import { Loader2, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StrokePredictionFormProps {
  onPredictionResult: (result: PredictionResult) => void;
}

const StrokePredictionForm = ({ onPredictionResult }: StrokePredictionFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<StrokePredictionData>({
    gender: "",
    age: 0,
    hypertension: 0,
    heart_disease: 0,
    ever_married: "",
    work_type: "",
    residence_type: "",
    avg_glucose_level: 0,
    bmi: 0,
    smoking_status: ""
  });

  const handleInputChange = (field: keyof StrokePredictionData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      'gender', 'ever_married', 'work_type', 'residence_type', 'smoking_status'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof StrokePredictionData]) {
        toast({
          title: "Validation Error",
          description: `Please fill in all required fields`,
          variant: "destructive"
        });
        return false;
      }
    }

    if (formData.age <= 0 || formData.age > 120) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid age (1-120)",
        variant: "destructive"
      });
      return false;
    }

    if (formData.avg_glucose_level <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid glucose level",
        variant: "destructive"
      });
      return false;
    }

    if (formData.bmi <= 0 || formData.bmi > 60) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid BMI (1-60)",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Sending prediction request with data:', formData);
      
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PredictionResult = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      console.log('Received prediction result:', result);
      
      onPredictionResult(result);
      
      toast({
        title: "Prediction Complete",
        description: "Your stroke risk assessment has been completed.",
      });
      
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Prediction Error",
        description: "Unable to get prediction. Please check your backend API connection.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl text-blue-700">
          <Activity className="h-6 w-6" />
          Stroke Risk Assessment
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Please provide accurate information for the most reliable prediction
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Gender" required>
              <Select onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Age" required>
              <Input
                type="number"
                placeholder="Enter age (e.g., 25 to 90)"
                min="1"
                max="120"
                value={formData.age || ''}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
              />
            </FormField>

            <FormField label="Hypertension" required>
              <Select onValueChange={(value) => handleInputChange('hypertension', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Do you have hypertension?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Heart Disease" required>
              <Select onValueChange={(value) => handleInputChange('heart_disease', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Do you have heart disease?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Ever Married" required>
              <Select onValueChange={(value) => handleInputChange('ever_married', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Have you ever been married?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Work Type" required>
              <Select onValueChange={(value) => handleInputChange('work_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Self-employed">Self-employed</SelectItem>
                  <SelectItem value="Govt_job">Government Job</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                  <SelectItem value="Never_worked">Never Worked</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Residence Type" required>
              <Select onValueChange={(value) => handleInputChange('residence_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select residence type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urban">Urban</SelectItem>
                  <SelectItem value="Rural">Rural</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Average Glucose Level (mg/dL)" required>
              <Input
                type="number"
                step="0.01"
                placeholder="Enter Level (e.g., 80 to 300)"
                min="0"
                value={formData.avg_glucose_level || ''}
                onChange={(e) => handleInputChange('avg_glucose_level', parseFloat(e.target.value) || 0)}
              />
            </FormField>

            <FormField label="BMI (Body Mass Index)" required>
              <Input
                type="number"
                step="0.1"
                placeholder="Enter BMI (e.g., 18.5 to 40)"
                min="0"
                max="60"
                value={formData.bmi || ''}
                onChange={(e) => handleInputChange('bmi', parseFloat(e.target.value) || 0)}
              />
            </FormField>

            <FormField label="Smoking Status" required>
              <Select onValueChange={(value) => handleInputChange('smoking_status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select smoking status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formerly smoked">Never Smoked</SelectItem>
                  <SelectItem value="Smokes">Formerly Smoked</SelectItem>
                  <SelectItem value="Never smoked">Currently Smokes</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Get Stroke Risk Prediction'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StrokePredictionForm;
