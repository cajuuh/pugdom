import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const uploadMedia = async (fileUri: string, description: string) => {
  try {
    const userInfoString = await AsyncStorage.getItem("userInfo");
    if (!userInfoString) {
      throw new Error("User not authenticated");
    }

    const { accessToken, serverUrl } = JSON.parse(userInfoString);
    if (!accessToken || !serverUrl) {
      throw new Error("Access token or server URL is missing");
    }

    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      type: "image/jpeg",
      name: "photo.jpg",
    } as any);

    if (description) {
      formData.append("description", description);
    }

    const response = await axios.post(`${serverUrl}/api/v2/media`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.id;
  } catch (error: any) {
    console.error("Media upload failed", error.message);
    throw error;
  }
};
