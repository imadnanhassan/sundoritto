import React, { TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, ...props }) => {
  return (
    <div className="w-full">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <textarea
        {...props}
        className={`w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 
          outline-[2px] outline-transparent outline-offset-[2px] 
          hover:border-primary focus:border-primary focus:outline-primary transition-all duration-200
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:outline-red-500"
              : ""
          }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default Textarea;
