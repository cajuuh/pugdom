import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FeedItem } from "../screens/types";

export interface GetHomeFeedOptions {
  latestOnly?: boolean;
  limit?: number;
  since_id?: string;
  max_id?: string;
  fetchEmojis?: boolean;
}

export interface FeedResponse {
  feedItems: FeedItem[];
  customEmojis?: Emoji[];
}

export interface Emoji {
  shortcode: string;
  url: string;
  static_url: string;
  visible_in_picker?: boolean;
}

export const getHomeFeed = async (
  options: GetHomeFeedOptions = {}
): Promise<FeedResponse> => {
  try {
    const userInfoString = await AsyncStorage.getItem("userInfo");
    if (!userInfoString) throw new Error("User not authenticated");

    const { accessToken, serverUrl } = JSON.parse(userInfoString);
    if (!accessToken || !serverUrl) throw new Error("Access token or server URL is missing");

    // Build query params for feed
    const params = new URLSearchParams();
    if (options.latestOnly) params.append("limit", "1");
    if (options.limit) params.append("limit", options.limit.toString());
    if (options.since_id) params.append("since_id", options.since_id);
    if (options.max_id) params.append("max_id", options.max_id);

    const endpoint = `${serverUrl}/api/v1/timelines/home${params.toString() ? "?" + params.toString() : ""}`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    // Fetch feed and emojis (optional)
    const feedPromise = axios.get<FeedItem[]>(endpoint, { headers });

    let emojiPromise: Promise<Emoji[]>;
    if (options.fetchEmojis !== false) {
      emojiPromise = axios.get<Emoji[]>(`${serverUrl}/api/v1/custom_emojis`, { headers })
        .then(resp => resp.data)
        .catch(err => {
          console.warn("Failed to fetch custom emojis:", err?.response?.data || err.message);
          return [];
        });
    } else {
      emojiPromise = Promise.resolve([]);
    }

    const [feedResponse, customEmojis] = await Promise.all([
      feedPromise,
      emojiPromise,
    ]);

    return {
      feedItems: Array.isArray(feedResponse.data) ? feedResponse.data : [],
      customEmojis,
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Network error fetching home feed or emojis:", error?.response?.data || error.message);
    } else {
      console.error("Error fetching home feed or emojis:", error.message);
    }
    throw error;
  }
};
