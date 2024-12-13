import { useState, useCallback } from "react";
import axios from "axios";

const useApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(config);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error?.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, error, loading };
};

export default useApi;
