import axios from "axios";
import { config } from "../config";
import * as AuthSession from "expo-auth-session";

const getToken = async (serverUrl: string, code: string) => {
  const tokenRequestData = {
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: AuthSession.makeRedirectUri({ scheme: "pugdom" }),
  };

  console.log("Token request data:", tokenRequestData);

  try {
    const response = await axios.post(
      `${serverUrl}/oauth/token`,
      new URLSearchParams(tokenRequestData).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    console.log("Token response data:", response.data);
    return response.data.access_token;
  } catch (error: any) {
    console.error("Error getting token:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
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
