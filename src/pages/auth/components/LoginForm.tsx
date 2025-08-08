import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/routeConstants";
import TextInput from "@/components/ui/TextInput";
import PasswordInput from "@/components/ui/PasswordInput";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default login logic
        await new Promise((resolve) => setTimeout(resolve, 1000));

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", formData.email);

        navigate(ROUTE_PATHS.DASHBOARD);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h1 className='title'>Welcome!</h1>
      <p className='subtitle'>Enter details to login.</p>

      <TextInput
        type='email'
        name='email'
        placeholder='Email'
        value={formData.email}
        onChange={handleInputChange}
        required
        autoComplete='email'
      />

      <PasswordInput
        name='password'
        placeholder='Password'
        value={formData.password}
        onChange={handleInputChange}
        required
        autoComplete='current-password'
      />

      <a href='#forgot-password' className='forgot-password'>
        FORGOT PASSWORD?
      </a>

      <PrimaryButton
        type='submit'
        disabled={!isFormValid}
        isLoading={isLoading}
        loadingText='LOGGING IN...'
      >
        LOG IN
      </PrimaryButton>
    </form>
  );
}
