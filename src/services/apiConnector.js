import axios from "axios";

// Example of apiConnector using Axios
export const apiConnector = async (method, url, data, options) => {
    try {
        const response = await axios({
            method,
            url,
            data,
            ...options,
            withCredentials:true,
            
        });

        return response; // Return the response if successful
    } catch (error) {
        if (error.response) {
            // The server responded with a status code that falls out of the range of 2xx
            const status = error.response.status;
            const message = error.response.data?.message || "Request failed";
            // console.log(`Error ${status}: ${message}`);
            throw { status, message }; // Throw error with status and message
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
            throw new Error("No response from the server. Please try again.");
        } else {
            // Something went wrong in setting up the request
            console.error("Axios setup error:", error.message);
            throw new Error("Request setup failed. Please check your connection.");
        }
    }
};
