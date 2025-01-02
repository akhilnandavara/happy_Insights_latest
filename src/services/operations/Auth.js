import { apiConnector } from "../apiConnector";
import { authApi } from "../apis";
import { setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

// Function to handle signup
export function signup({ name, email }) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", authApi.signup, { name, email }, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                return { success: true, message: response.data.message };
            } else {
                return { success: false, message: response.data?.message || "An unknown error occurred during signup" };
            }
        } catch (error) {
            return { success: false, message: error.message || "Signup failed due to a network error." };
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export function login({ username, passwd, rememberMe, navigate }) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", authApi.login, { username, passwd }, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                localStorage.setItem("login_type", response.data.login_type);
                sessionStorage.setItem("user", JSON.stringify(response.data.user));

                if (rememberMe) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }

                dispatch(setUser(response.data.user));
                console.log(response.data.user);
                navigate("/dashboard");
                return { success: true };
            } else {
                return { success: false, message: response.data?.message || "Login failed." };
            }
        } catch (error) {
            console.error(error.response?.status === 401 ? "Unauthorized: Invalid credentials or token." : error.message);
            return { success: false, message: error.message || "Login failed due to a network error." };
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function signInWithGoogle(id_token, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", authApi.googleLogin, { id_token }, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                localStorage.setItem("login_type", response.data.login_type);
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                dispatch(setUser(response.data.user));
                navigate("/dashboard");
                return { success: true };
            } else {
                return { success: false, message: response.data?.message || "Google login failed." };
            }
        } catch (error) {
            console.error(error.response?.status === 401 ? "Unauthorized: Invalid credentials or token." : error.message);
            return { success: false, message: error.message || "Google login failed due to a network error." };
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export async function getSsoId() {
    try {
        const response = await apiConnector("GET", authApi.getClientId);
        return response.data.google_sso_client_id;
    } catch (error) {
        console.error(error.message || "Failed to get SSO ID.");
        return null;
    }
}

export function logout(navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", authApi.logout);

            if (response.status === 200) {
                dispatch(setUser(null));
                localStorage.removeItem("login_type");
                localStorage.removeItem("user");
                localStorage.removeItem("subscription");
                navigate("/");
                return { success: true, message: response.data.message };
            } else {
                return { success: false, message: response.data?.message || "Logout failed." };
            }
        } catch (error) {
            console.error(error.message || "Logout failed due to a network error.");
            return { success: false, message: error.message || "Logout failed due to a network error." };
        } finally {
            dispatch(setLoading(false));
        }
    }
}
