import React, { useState } from "react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showToggle?: boolean;
}

export default function PasswordInput({
  label,
  error,
  showToggle = true,
  className = "",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='form-group password-field'>
      {label && <label className='form-label'>{label}</label>}
      <input
        type={showPassword ? "text" : "password"}
        className={`form-input ${error ? "error" : ""} ${className}`}
        {...props}
      />
      {showToggle && (
        <button
          type='button'
          className='show-password'
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "HIDE" : "SHOW"}
        </button>
      )}
      {error && <span className='form-error'>{error}</span>}
    </div>
  );
}
