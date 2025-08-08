import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function TextInput({
  label,
  error,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <div className='form-group'>
      {label && <label className='form-label'>{label}</label>}
      <input
        className={`form-input ${error ? "error" : ""} ${className}`}
        {...props}
      />
      {error && <span className='form-error'>{error}</span>}
    </div>
  );
}
