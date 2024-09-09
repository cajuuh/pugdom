import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationItem } from "../components/interfaces";
import { Emoji, MediaAttachment, Poll } from "../screens/types";

interface NotificationsResponse {
  notifications: NotificationItem[];
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

    const [notificationsResponse, emojiResponse] = await Promise.all([
      axios.get<NotificationItem[]>(`${serverUrl}/api/v1/notifications`, {
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

    const notifications = notificationsResponse.data.map((notification) => {
      const mediaAttachments =
        notification.status?.media_attachments?.map(
          (attachment: MediaAttachment) => attachment.url
        ) || [];

      const poll = notification.status?.poll;

      return {
        id: notification.id,
        type: notification.type,
        title: notification.type,
        body: notification.status ? notification.status.content : "",
        date: notification.created_at, // Map created_at to date
        created_at: notification.created_at, // Add created_at property
        account: {
          id: notification.account.id,
          username: notification.account.username,
          avatar: notification.account.avatar,
        },
        status: notification.status
          ? {
              id: notification.status.id,
              content: notification.status.content,
              media_attachments: notification.status.media_attachments,
              poll: notification.status.poll,
            }
          : undefined,
        mediaAttachments,
        poll,
      };
    });

    return {
      notifications,
      customEmojis: emojiResponse.data,
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
