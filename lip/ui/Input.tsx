import React from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, icon, ...props }) => {
  return (
    <div className="w-full flex flex-col mb-4 relative">
      {label && (
        <label
          htmlFor={props.id}
          className="mb-1 font-semibold text-gray-900 text-sm"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 
  outline-[2px] outline-transparent outline-offset-[2px] 
  hover:border-primary focus:border-primary focus:outline-primary transition-all duration-200
  ${icon ? "pl-10" : ""} ${
            error
              ? "border-red-500 focus:border-red-500 focus:outline-red-500"
              : ""
          }`}
        />
      </div>
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default Input;
