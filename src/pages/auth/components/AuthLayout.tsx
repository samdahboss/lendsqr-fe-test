import React from "react";

interface AuthLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export default function AuthLayout({
  leftContent,
  rightContent,
}: AuthLayoutProps) {
  return (
    <div className='login-container'>
      <div className='login-left'>{leftContent}</div>
      <div className='login-right'>
        <div className='login-form-container'>{rightContent}</div>
      </div>
    </div>
  );
}
