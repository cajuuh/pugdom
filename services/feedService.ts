import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getHomeFeed = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    if (!userInfo) {
      throw new Error("User not authenticated");
    }

    const { accessToken, serverUrl } = JSON.parse(userInfo);
    console.log("Retrieved userInfo:", { accessToken, serverUrl });
    if (!accessToken || !serverUrl) {
      throw new Error("Access token or server URL is missing");
    }

    const response = await axios.get(`${serverUrl}/api/v1/timelines/home`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching home feed:", error);
    throw error;
  }
};
