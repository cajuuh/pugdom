// tootContext.tsx
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

      const userInfoString = await AsyncStorage.getItem("userInfo");

      if (!userInfoString) {
        console.error("User not authenticated");
        return;
      }

      const { accessToken, serverUrl } = JSON.parse(userInfoString);
      if (!accessToken || !serverUrl) {
        console.error("Access token or server URL is missing");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${serverUrl}/api/v1/statuses/${tootId}/context`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setThread(data);
      } catch (err) {
        setError("Failed to load toot context.");
      } finally {
        setLoading(false);
      }
    };

    fetchTootContext();
  }, [tootId]);

  return { thread, loading, error };
};

export default useTootContext;
