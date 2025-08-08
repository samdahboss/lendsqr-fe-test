import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

export default function PrimaryButton({
  children,
  isLoading = false,
  loadingText = "Loading...",
  className = "",
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`login-button ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
