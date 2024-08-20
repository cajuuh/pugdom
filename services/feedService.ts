import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FeedItem } from "../screens/types";

interface GetHomeFeedOptions {
  latestOnly?: boolean;
}

export const getHomeFeed = async (
  options?: GetHomeFeedOptions
): Promise<FeedItem[]> => {
  try {
    const userInfoString = await AsyncStorage.getItem("userInfo");
    if (!userInfoString) {
      throw new Error("User not authenticated");
    }

    const { accessToken, serverUrl } = JSON.parse(userInfoString);
    if (!accessToken || !serverUrl) {
      throw new Error("Access token or server URL is missing");
    }

    let endpoint = `${serverUrl}/api/v1/timelines/home`;

    if (options?.latestOnly) {
      endpoint += "?limit=1"; // Fetch only the latest post if specified
    }

    const response = await axios.get<FeedItem[]>(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Network error fetching home feed:", error.message);
    } else {
      console.error("Error fetching home feed:", error.message);
    }
    throw error;
  }
};
