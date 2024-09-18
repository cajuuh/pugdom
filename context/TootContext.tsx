import { useState, useEffect } from "react";
import { TootContext } from "../screens/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTootContext = (tootId: string | null) => {
  const [thread, setThread] = useState<TootContext | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTootContext = async () => {
      if (!tootId) return;

      try {
        // Fetch the user info from AsyncStorage
        const userInfoString = await AsyncStorage.getItem("userInfo");

        if (!userInfoString) {
          throw new Error("User not authenticated. Please log in.");
        }

        const { accessToken, serverUrl } = JSON.parse(userInfoString);
        if (!accessToken || !serverUrl) {
          throw new Error("Missing access token or server URL.");
        }

        setLoading(true);

        // Fetch the toot context from the API
        const response = await fetch(`${serverUrl}/api/v1/statuses/${tootId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Check for non-OK responses
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to load toot context: ${errorText}`);
        }

        const data = await response.json();
        setThread(data); // Set the thread state with the fetched data
        setError(null); // Clear any existing error
      } catch (err: any) {
        // Set specific error messages based on what happened
        setError(
          err.message || "An error occurred while loading the toot context."
        );
      } finally {
        setLoading(false); // Stop loading when the request is done
      }
    };

    fetchTootContext();
  }, [tootId]);

  return { thread, loading, error };
};

export default useTootContext;
