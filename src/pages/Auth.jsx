import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import SignupForm from "../components/Auth/SignupForm";
import ImageSection from "../components/Auth/ImageSection";
import styles from "../styles/components/Auth.module.css";
import { Img } from "../components/ui";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";

// Memoized components
const MemoizedLoginForm = React.memo(LoginForm);
const MemoizedSignupForm = React.memo(SignupForm);
const MemoizedImageSection = React.memo(ImageSection);

export default function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === "/";
  
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <Link to="/" className={styles.logo}>
        <Img src={logo} className={styles.logoImage} alt="Logo" />
        <div className={styles.logoText}>
          Happy<span className={styles.boldGreen}>Insights</span>
        </div>
      </Link>

      <div className={styles.contentWrapper}>
        <div className={styles.formContainer}>
          {isLogin ? <MemoizedLoginForm /> : <MemoizedSignupForm />}
        </div>
        <MemoizedImageSection />
      </div>
    </div>
  );
}
