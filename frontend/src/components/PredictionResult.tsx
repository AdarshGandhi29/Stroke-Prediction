
import { PredictionResult as PredictionResultType } from "@/types/stroke";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface PredictionResultProps {
  result: PredictionResultType;
  onReset: () => void;
}

const PredictionResult = ({ result, onReset }: PredictionResultProps) => {
  const isHighRisk = result.prediction === 1;
  
  return (
    <Card className={`w-full max-w-md mx-auto ${isHighRisk ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-xl">
          {isHighRisk ? (
            <AlertTriangle className="h-6 w-6 text-red-600" />
          ) : (
            <CheckCircle className="h-6 w-6 text-green-600" />
          )}
          Prediction Result
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className={`text-2xl font-bold ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>
          {isHighRisk ? 'High Risk' : 'Low Risk'}
        </div>
        <p className="text-gray-600">
          {isHighRisk 
            ? 'The analysis indicates a higher likelihood of stroke risk. Please consult with a healthcare professional for proper evaluation.'
            : 'The analysis suggests a lower likelihood of stroke risk. Continue maintaining a healthy lifestyle.'
          }
        </p>
        {result.probability && (
          <div className="text-sm text-gray-500">
            Confidence: {(result.probability * 100).toFixed(1)}%
          </div>
        )}
        <button
          onClick={onReset}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Make Another Prediction
        </button>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
