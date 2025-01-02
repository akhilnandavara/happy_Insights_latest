import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithGoogle } from "../services/operations/Auth";
import { useNavigate } from "react-router-dom";

const useAuthForm = (authAction, isSignupForm) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signupMsg, setSignupMsg] = useState(null);

  const handleError = useCallback((message) => {
    setError(message);
    setTimeout(() => setError(null), 5000); // Clear after 5 seconds
  }, []);

  const onSubmit = useCallback(
    async (data, reset) => {
      setLoading(true);
      const result = await dispatch(authAction(data));
      isSignupForm && handleSignupMsgPopup(result.message);

      if (result.success) {
        reset();
      } else {
        handleError(result.message);
      }
      setLoading(false);
    },
    [dispatch, authAction, handleError]
  );

  const handleSignupMsgPopup = useCallback((message) => {
    setSignupMsg(message);
    setTimeout(() => setSignupMsg(null), 5000); // Clear the message after 5 seconds
  }, []);

  const handleGoogleLoginSuccess = useCallback(
    (response) => {
      dispatch(signInWithGoogle(response.credential, navigate));
    },
    [dispatch, signInWithGoogle, navigate]
  );

  const handleGoogleLoginFailure = useCallback(
    (error) => {
      handleError(error.message);
    },
    [handleError]
  );

  return {
    loading,
    error,
    onSubmit,
    handleGoogleLoginSuccess,
    handleGoogleLoginFailure,
    signupMsg,
    setSignupMsg

  };
};

export default useAuthForm;
