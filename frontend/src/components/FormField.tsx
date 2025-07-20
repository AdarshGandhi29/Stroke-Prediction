
import { FormFieldProps } from "@/types/stroke";

const FormField = ({ label, children, required = false }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
};

export default FormField;
