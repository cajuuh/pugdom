import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PostParams } from "../components/interfaces";

export const useStatusService = () => {
  // Function to create a new status
  const createStatus = async ({
    statusText,
    mediaIds = [],
  }: Omit<PostParams, "statusId">) => {
    try {
      const userInfoString = await AsyncStorage.getItem("userInfo");
      if (!userInfoString) {
        throw new Error("User not authenticated");
      }

      const { accessToken, serverUrl } = JSON.parse(userInfoString);
      if (!accessToken || !serverUrl) {
        throw new Error("Access token or server URL is missing");
      }

      const response = await axios.post(
        `${serverUrl}/api/v1/statuses`,
        {
          status: statusText,
          media_ids: mediaIds.length > 0 ? mediaIds : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error creating status:", error.message);
      throw error;
    }
  };

  // Function to reply to an existing status
  const replyToStatus = async ({
    statusId,
    statusText,
    mediaIds = [],
  }: PostParams) => {
    try {
      const userInfoString = await AsyncStorage.getItem("userInfo");
      if (!userInfoString) {
        throw new Error("User not authenticated");
      }

      const { accessToken, serverUrl } = JSON.parse(userInfoString);
      if (!accessToken || !serverUrl) {
        throw new Error("Access token or server URL is missing");
      }

      const response = await axios.post(
        `${serverUrl}/api/v1/statuses`,
        {
          status: statusText,
          in_reply_to_id: statusId,
          media_ids: mediaIds.length > 0 ? mediaIds : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error replying to status:", error.message);
      throw error;
    }
  };

  return { createStatus, replyToStatus };
};
