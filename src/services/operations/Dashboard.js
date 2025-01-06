import { setLoading, setSubDetails, setUser, setUserConfig } from "../../store/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { userApi, youtubeAPi } from "../apis";

// Helper function to update localStorage and Redux
const updateLocalStorageAndRedux = (dispatch, user, subscription) => {
    if (user) {
        dispatch(setUser(user));
        sessionStorage.setItem("user", JSON.stringify(user));
    }
    if (subscription) {
        dispatch(setSubDetails(subscription));
        sessionStorage.setItem("subscription", JSON.stringify(subscription));
    }
};

export const getUserDetails = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("GET", userApi.getUserDetails, null, {}, false);
        const { user, subscription_plan: subscription } = response.data;
        // Update Redux store and localStorage
        updateLocalStorageAndRedux(dispatch, user, subscription);
        return { success: true, user };
    } catch (error) {
        console.error("Error fetching user details:", error.message || error);
        localStorage.clear(); // Clear invalid session data
        return { success: false };
    } finally {
        dispatch(setLoading(false));
    }
};

// Fetch all configurations and update Redux
export const getAllConfig = (navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("GET", userApi.getAllConfig, null, {}, false);
        dispatch(setUserConfig(response.data));
    } catch (error) {
        navigate("/")
        console.error("Error fetching configurations:", error.message || error);
    } finally {
        dispatch(setLoading(false));
    }
};
// Save YouTube configuration
export const saveYoutubeConfig = ({ channel_id, sign }) => async () => {
    try {
        const response = await apiConnector(
            "POST",
            youtubeAPi.saveYoutubeConfig,
            { channel_id: [channel_id], sign },
            {},
            false
        );
        console.log("YouTube configuration saved successfully:", response.data);
    } catch (error) {
        console.error("Error saving YouTube configuration:", error.message || error);
    }
};
