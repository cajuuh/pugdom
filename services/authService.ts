import axios from "axios";
import { config } from "../config";

const getToken = async (serverUrl: string, code: string) => {
  try {
    const response = await axios.post(`${serverUrl}/oauth/token`, {
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: config.REDIRECT_URI,
      code,
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting token:", error);
    throw error;
  }
};

const getUserInfo = async (serverUrl: string, accessToken: string) => {
  try {
    const response = await axios.get(
      `${serverUrl}/api/v1/accounts/verify_credentials`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting user info:", error);
    throw error;
  }
};

export { getToken, getUserInfo };
