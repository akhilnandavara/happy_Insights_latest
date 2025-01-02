import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../components/Loader"; // You can customize this component
import { getUserDetails } from "../services/operations/Dashboard";
import { setLoading } from "../slices/authSlice";

const withSessionValidation = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const { loading } = useSelector((state) => state.auth);

    useEffect(() => {
      const validateSession = async () => {
        dispatch(setLoading(true));
        if (user) {
          navigate("/dashboard", { replace: true });
        } else {
          try {
            const result = await dispatch(getUserDetails());
            if (result.success) {
              navigate("/dashboard", { replace: true });
            }
          } catch (error) {
            console.error("Session validation failed", error);
          } finally {
            dispatch(setLoading(false));
          }
        }
      };

      validateSession();
    }, [user, dispatch, navigate]);

    if (loading) {
      return <LoadingSpinner />;
    }

    return <Component {...props} />;
  };
};

export default withSessionValidation;
