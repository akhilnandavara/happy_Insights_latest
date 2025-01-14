import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CommonAuthForm from "./CommonAuthForm";
import useAuthForm from "../../hooks/useAuthForm";
import { login } from "../../services/operations/Auth";
import { useSelector } from "react-redux";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function LoginForm() {
  const {loginError}=useSelector((state)=>state.auth)
  const {
    loading,
    onSubmit,
    handleGoogleLoginSuccess,
    handleGoogleLoginFailure,
  } = useAuthForm(login);

  return (
    <CommonAuthForm
      title="Login"
      subtitle="Login to access your travelwise account"
      validationSchema={loginSchema}
      onSubmit={onSubmit}
      googleLoginSuccess={handleGoogleLoginSuccess}
      googleLoginFailure={handleGoogleLoginFailure}
      fields={[
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Your Email",
        },
      ]}
      buttonText={loading ? "Logging In..." : "Login"}
      redirectText="Don’t have an account?"
      redirectLink="/signup"
      redirectLinkText="Sign Up"
      showPasswordField={true}
      loginError={loginError}
    />
  );
}

export default LoginForm;
