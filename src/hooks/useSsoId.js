import { useState, useEffect } from "react";
import { getSsoId } from "../services/operations/Auth.js";

const useSsoId = () => {
  const [clientId, setClientId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSsoId = async () => {
      try {
        const sso = await getSsoId(); // Fetch SSO ID from the API
        setClientId(sso);
      } catch (err) {
        console.error("Error fetching SSO ID:", err);
        setError("Failed to load configuration. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSsoId();
  }, []);

  return { clientId, isLoading, error };
};

export default useSsoId;
