import React, { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import styles from "../../styles/components/Auth.module.css";
import { Heading } from "../ui";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const CommonAuthForm = React.memo(
  ({
    title,
    subtitle,
    validationSchema,
    onSubmit,
    googleLoginSuccess,
    googleLoginFailure,
    fields,
    buttonText,
    redirectText,
    redirectLink,
    redirectLinkText,
    showPasswordField = true,
    googleBtnText,
    loginError,
    signupMsg,
  }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Add state to toggle password visibility

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(validationSchema),
    });

    const handleFormSubmit = useCallback(
      async (data) => {
        setLoading(true);
        await onSubmit(data, reset);
        setLoading(false);
      },
      [onSubmit, reset]
    );

    // Function to toggle password visibility
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <main className={styles.container}>
        <Heading as="h1" className={styles.title}>
          {title}
        </Heading>
        <p className={styles.subtitle}>{subtitle}</p>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {fields.map((field) => (
            <div className={styles.inputContainer} key={field.name}>
              <div htmlFor={field.name} className={styles.inputLabel}>
                {field.label}
              </div>
              <div className={styles.inputField}>
                <input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  aria-label={field.label}
                  {...register(field.name)}
                />
              </div>
              {errors[field.name] && (
                <span className={styles.errorText}>
                  {errors[field.name].message}
                </span>
              )}
            </div>
          ))}

          {showPasswordField && (
            <>
              <div className={styles.inputContainer}>
                <label htmlFor="password" className={styles.inputLabel}>
                  Password
                </label>
                <div className={styles.inputField}>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <span
                    onClick={toggleShowPassword}
                    className={styles.showPasswordBtn} // You can style this button
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <span className={styles.errorText}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className={styles.optionsContainer}>
                <div className={styles.rememberMeContainer}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className={styles.checkbox}
                    {...register("rememberMe")}
                  />
                  <label htmlFor="rememberMe" className={styles.rememberMeText}>
                    Remember Me
                  </label>
                </div>
                <Link to="/forgot-password" className={styles.forgotPassword}>
                  Forgot Password
                </Link>
              </div>
            </>
          )}

          {(loginError || signupMsg) && (
            <span className={styles.errorText}>{loginError || signupMsg}</span>
          )}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {buttonText}
          </button>
        </form>

        <p className={styles.redirectText}>
          {redirectText}{" "}
          <Link to={redirectLink} className={styles.redirectTextLink}>
            {redirectLinkText}
          </Link>
        </p>

        <p className={styles.orLoginSignupWith}>Or {title} With</p>

        <div className={styles.socialLoginContainer}>
          <GoogleLogin
            text={googleBtnText}
            onSuccess={googleLoginSuccess}
            onError={googleLoginFailure}
          />
        </div>
      </main>
    );
  }
);

export default CommonAuthForm;
