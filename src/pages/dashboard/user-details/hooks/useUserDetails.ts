import { useState, useEffect } from "react";
import { UserDetails } from "../types";
import { fetchUserDetails } from "../services/userDetailsService";

export const useUserDetails = (userId: string) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const details = await fetchUserDetails(userId);
        setUserDetails(details);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load user details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      loadUserDetails();
    }
  }, [userId]);

  return {
    userDetails,
    isLoading,
    error,
  };
};
