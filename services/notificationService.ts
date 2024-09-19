import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FeedItem, Emoji } from "../screens/types"; // Use Status and Emoji from types

interface NotificationsResponse {
  notifications: FeedItem[]; // Use Status[] to align with the types
  customEmojis: Emoji[];
}

export const getNotifications = async (): Promise<NotificationsResponse> => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    if (!userInfo) {
      throw new Error("User not authenticated");
    }

    const { accessToken, serverUrl } = JSON.parse(userInfo);
    if (!accessToken || !serverUrl) {
      throw new Error("Access token or server URL is missing");
    }

    // Fetch notifications and custom emojis in parallel
    const [notificationsResponse, emojiResponse] = await Promise.all([
      axios.get(`${serverUrl}/api/v1/notifications`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      axios.get(`${serverUrl}/api/v1/custom_emojis`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ]);

    // Map through the notifications and convert them into Status objects
    const notifications: FeedItem[] = notificationsResponse.data.map(
      (notification: any) => {
        const media_attachments = notification.status?.media_attachments || [];
        const poll = notification.status?.poll;

        return {
          id: notification.id,
          uri: notification.status?.uri || "",
          url: notification.status?.url || "",
          account: {
            id: notification.account.id,
            username: notification.account.username,
            display_name: notification.account.display_name,
            avatar: notification.account.avatar,
            avatar_static: notification.account.avatar_static,
            header: notification.account.header,
            header_static: notification.account.header_static,
            url: notification.account.url,
            acct: notification.account.acct,
          },
          in_reply_to_id: notification.status?.in_reply_to_id || null,
          in_reply_to_account_id:
            notification.status?.in_reply_to_account_id || null,
          reblog: notification.status?.reblog || undefined,
          content: notification.status?.content || "",
          created_at: notification.created_at, // Map created_at to date
          emojis: notification.status?.emojis || [],
          media_attachments: media_attachments,
          mentions: notification.status?.mentions || [],
          tags: notification.status?.tags || [],
          poll: poll || undefined,
          favourites_count: notification.status?.favourites_count || 0,
          reblogs_count: notification.status?.reblogs_count || 0,
          replies_count: notification.status?.replies_count || 0,
          sensitive: notification.status?.sensitive || false,
          spoiler_text: notification.status?.spoiler_text || "",
          visibility: notification.status?.visibility || "public",
          language: notification.status?.language || null,
        };
      }
    );

    return {
      notifications,
      customEmojis: emojiResponse.data, // Return custom emojis as well
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
