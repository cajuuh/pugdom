import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNotifications = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    if (!userInfo) {
      throw new Error("User not authenticated");
    }

    const { accessToken, serverUrl } = JSON.parse(userInfo);
    if (!accessToken || !serverUrl) {
      throw new Error("Access token or server URL is missing");
    }

    const response = await axios.get(`${serverUrl}/api/v1/notifications`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.map((notification: any) => {
      const mediaAttachments =
        notification.status?.media_attachments?.map(
          (attachment: any) => attachment.url
        ) || [];

      const poll = notification.status?.poll;

      return {
        id: notification.id,
        title: notification.type,
        body: notification.status ? notification.status.content : "",
        date: notification.created_at,
        account: {
          id: notification.account.id,
          username: notification.account.username,
          avatar: notification.account.avatar,
        },
        status: notification.status
          ? {
              id: notification.status.id,
              content: notification.status.content,
            }
          : undefined,
        mediaAttachments,
        poll, // Include the poll data
      };
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
