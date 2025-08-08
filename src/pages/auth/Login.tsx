import AuthLayout from "./components/AuthLayout";
import AuthLogo from "./components/AuthLogo";
import AuthIllustration from "./components/AuthIllustration";
import LoginForm from "./components/LoginForm";
import "./Login.scss";

export default function Login() {
  const leftContent = (
    <>
      <AuthLogo />
      <AuthIllustration />
    </>
  );

  const rightContent = <LoginForm />;

  return <AuthLayout leftContent={leftContent} rightContent={rightContent} />;
}
