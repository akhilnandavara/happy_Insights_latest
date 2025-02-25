import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CommonAuthForm from "./CommonAuthForm";
import useAuthForm from "../../hooks/useAuthForm";
import { signup } from "../../services/operations/Auth";
import { useSelector } from "react-redux";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
signup
function SignupForm() {
  const { signSuccessMsg } = useSelector((state) => state.auth);

  const {
    loading,
    onSubmit,
    handleGoogleLoginSuccess,
    handleGoogleLoginFailure,
  } = useAuthForm(signup, true);

  return (
    <CommonAuthForm
      title="Signup"
      subtitle="Signup to access your travelwise account"
      validationSchema={signupSchema}
      onSubmit={onSubmit}
      googleLoginSuccess={handleGoogleLoginSuccess}
      googleLoginFailure={handleGoogleLoginFailure}
      fields={[
        { name: "name", label: "Name", type: "text", placeholder: "Your Name" },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Your Email",
        },
      ]}
      buttonText={loading ? "Signing Up..." : "Sign Up"}
      redirectText="Already have an account?"
      redirectLink="/login"
      redirectLinkText="Sign In"
      googleBtnText="Sign up with Google"
      showPasswordField={false}
      signupMsg={signSuccessMsg}
    />
  );
}

export default SignupForm;
