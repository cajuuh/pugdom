import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../context/AppContext";

export const useMastodonAPI = () => {
  const { appParams } = useAppContext();
  const apiBaseUrl = appParams?.apiBaseUrl;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = async () => {
    const userInfoString = await AsyncStorage.getItem("userInfo");
    if (!userInfoString) return undefined;
    const { accessToken } = JSON.parse(userInfoString);
    return { Authorization: `Bearer ${accessToken}` };
  };

  const favoriteStatus = async (statusId: string, isFavorited: boolean) => {
    if (!apiBaseUrl) {
      setError("API base URL is undefined.");
      return false;
    }

    setLoading(true);
    let endpoint = "";
    try {
      console.log("api base url", apiBaseUrl);
      const headers = await getAuthHeaders();
      if (isFavorited) {
        endpoint = `${apiBaseUrl}/api/v1/statuses/${statusId}/unfavourite`;
      } else {
        endpoint = `${apiBaseUrl}/api/v1/statuses/${statusId}/favourite`;
      }
      console.log("endpoint", endpoint);
      const response = await axios.post(endpoint, {}, { headers });
      setLoading(false);
      return response.status === 200;
    } catch (err) {
      setLoading(false);
      setError("Failed to favorite/unfavorite the status.");
      return false;
    }
  };

  const reblogStatus = async (statusId: string, isReblogged: boolean) => {
    if (!apiBaseUrl) {
      setError("API base URL is undefined.");
      return false;
    }

    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      const endpoint = isReblogged
        ? `${apiBaseUrl}/api/v1/statuses/${statusId}/unreblog`
        : `${apiBaseUrl}/api/v1/statuses/${statusId}/reblog`;
      const response = await axios.post(endpoint, {}, { headers });
      if (response.status === 200) {
        // Persist the reblogged state locally
        await AsyncStorage.setItem(
          `reblogged_${statusId}`,
          JSON.stringify(!isReblogged)
        );
      }
      setLoading(false);
      return response.status === 200;
    } catch (err) {
      setLoading(false);
      setError("Failed to boost/unboost the status.");
      return false;
    }
  };

  const bookmarkStatus = async (statusId: string, isBookmarked: boolean) => {
    if (!apiBaseUrl) {
      setError("API base URL is undefined.");
      return false;
    }

    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      const endpoint = isBookmarked
        ? `${apiBaseUrl}/api/v1/statuses/${statusId}/unbookmark`
        : `${apiBaseUrl}/api/v1/statuses/${statusId}/bookmark`;
      const response = await axios.post(endpoint, {}, { headers });
      setLoading(false);
      return response.status === 200;
    } catch (err) {
      setLoading(false);
      setError("Failed to bookmark/unbookmark the status.");
      return false;
    }
  };

  return { favoriteStatus, reblogStatus, bookmarkStatus, loading, error };
};
