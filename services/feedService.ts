import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FeedItem } from "../screens/types";

interface GetHomeFeedOptions {
  latestOnly?: boolean;
}

interface FeedResponse {
  feedItems: FeedItem[];
  customEmojis: Emoji[];
}

interface Emoji {
  shortcode: string;
  url: string;
  staticUrl: string;
}

export const getHomeFeed = async (
  options?: GetHomeFeedOptions
): Promise<FeedResponse> => {
  try {
    const userInfoString = await AsyncStorage.getItem("userInfo");
    if (!userInfoString) {
      throw new Error("User not authenticated");
    }

    const { accessToken, serverUrl } = JSON.parse(userInfoString);
    if (!accessToken || !serverUrl) {
      throw new Error("Access token or server URL is missing");
    }

    // Fetch the feed items
    let endpoint = `${serverUrl}/api/v1/timelines/home`;

    if (options?.latestOnly) {
      endpoint += "?limit=1"; // Fetch only the latest post if specified
    }

    const [feedResponse, emojiResponse] = await Promise.all([
      axios.get<FeedItem[]>(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      axios.get<Emoji[]>(`${serverUrl}/api/v1/custom_emojis`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ]);

    return {
      feedItems: feedResponse.data,
      customEmojis: emojiResponse.data,
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Network error fetching home feed or emojis:", error.message);
    } else {
      console.error("Error fetching home feed or emojis:", error.message);
    }
    throw error;
  }
};
