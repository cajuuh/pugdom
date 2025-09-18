import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PostParams } from "../components/interfaces";

export const useStatusService = () => {
  const createStatus = async (payload: PostParams) => {
    try {
      const userInfoString = await AsyncStorage.getItem("userInfo");
      if (!userInfoString) throw new Error("User not authenticated");
      const { accessToken, serverUrl } = JSON.parse(userInfoString);
      if (!accessToken || !serverUrl) throw new Error("Access token or server URL is missing");

      const params = new URLSearchParams();

      // Status content
      if (payload.statusText) params.append("status", payload.statusText);

      // Media attachments
      if (payload.mediaIds) {
        payload.mediaIds.forEach((id: string) => params.append("media_ids[]", id));
      }

      // Poll data
      if (payload.pollData) {
        payload.pollData.options.forEach((opt: string) => params.append("poll[options][]", opt));
        params.append("poll[expires_in]", payload.pollData.duration.toString());
        if (payload.pollData.multiple !== undefined) params.append("poll[multiple]", payload.pollData.multiple ? "true" : "false");
        if (payload.pollData.hideTotals !== undefined) params.append("poll[hide_totals]", payload.pollData.hideTotals ? "true" : "false");
      }

      // Reply to status
      if (payload.inReplyToId) params.append("in_reply_to_id", payload.inReplyToId);

      // Visibility
      if (payload.visibility) params.append("visibility", payload.visibility);

      // Sensitive
      if (payload.sensitive !== undefined) params.append("sensitive", payload.sensitive ? "true" : "false");

      // Spoiler / content warning
      if (payload.spoilerText) params.append("spoiler_text", payload.spoilerText);

      // Language
      if (payload.language) params.append("language", payload.language);

      // Add additional fields if needed

      const headers = { Authorization: `Bearer ${accessToken}` };

      const response = await axios.post(
        `${serverUrl}/api/v1/statuses`,
        params,
        { headers }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Error creating status (response):", error.response.data);
      } else {
        console.error("Error creating status (network):", error.message);
      }
      throw error;
    }
  };

  const replyToStatus = async (payload: PostParams) => {
    // Same logic as createStatus, just ensure inReplyToId is set
    return createStatus(payload);
  };

  return { createStatus, replyToStatus };
};
