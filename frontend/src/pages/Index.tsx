
import { useState } from "react";
import { PredictionResult } from "@/types/stroke";
import StrokePredictionForm from "@/components/StrokePredictionForm";
import PredictionResultComponent from "@/components/PredictionResult";
import { Heart, Brain, Activity } from "lucide-react";

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  const handlePredictionResult = (result: PredictionResult) => {
    setPredictionResult(result);
  };

  const handleReset = () => {
    setPredictionResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <Heart className="h-6 w-6 text-red-500" />
                <Activity className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Stroke Risk Prediction System
            </h1>
            <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced machine learning classification models evaluate your stroke risk based on medical and lifestyle factors.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!predictionResult ? (
          <div className="space-y-8">
            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">ML-Based Classification</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Utilizes machine learning classification models to assess your stroke risk based on key health factors
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  <h3 className="font-semibold text-gray-900">Comprehensive Assessment</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Evaluates medical history, lifestyle factors, and demographic information
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="h-6 w-6 text-green-500" />
                  <h3 className="font-semibold text-gray-900">Instant Results</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Get immediate risk assessment with actionable health recommendations
                </p>
              </div>
            </div>

            {/* Form */}
            <StrokePredictionForm onPredictionResult={handlePredictionResult} />
            
            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-amber-800 text-sm text-center">
                <strong>Medical Disclaimer:</strong> This tool is for informational purposes only and should not replace professional medical advice. 
                Please consult with a healthcare provider for proper medical evaluation and treatment.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <PredictionResultComponent result={predictionResult} onReset={handleReset} />
            
            {/* Additional Information */}
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-3">Next Steps:</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Consult with your healthcare provider to discuss these results</li>
                <li>• Maintain regular health check-ups and monitoring</li>
                <li>• Consider lifestyle modifications for better health outcomes</li>
                <li>• Keep track of your medical history and risk factors</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2025 Stroke Risk Prediction System. Built for educational and informational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
