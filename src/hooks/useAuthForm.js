import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithGoogle } from "../services/operations/Auth";
import { useNavigate } from "react-router-dom";
import { setLoginError, setSignUpSuccessMsg } from "../store/slices/authSlice";

const useAuthForm = (authAction, isSignupForm) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleError = useCallback((message) => {
    dispatch(setLoginError(message));
    setTimeout(() => dispatch(setLoginError(null)), 5000); // Clear the error message after 5 seconds
  }, [dispatch]);

  const onSubmit = useCallback(
    async (data, reset) => {
      setLoading(true);
      const result = await dispatch(authAction(data));
      console.log("result", result);
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
    dispatch(setSignUpSuccessMsg(message));
    setTimeout(() => dispatch(setSignUpSuccessMsg(null)), 5000); // Clear the message after 5 seconds
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
    onSubmit,
    handleGoogleLoginSuccess,
    handleGoogleLoginFailure,
  };
};

export default useAuthForm;
