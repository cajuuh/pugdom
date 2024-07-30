import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { getToken, getUserInfo } from "../../services/authService";
import { config } from "../../config";
import { useAppContext } from "../../context/AppContext";

type Props = NativeStackScreenProps<RootStackParamList, "WebView">;

const WebViewScreen: React.FC<Props> = ({ route, navigation }) => {
  const { serverUrl } = route.params;
  const { setAppParam } = useAppContext();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: config.CLIENT_ID,
      redirectUri: AuthSession.makeRedirectUri({ scheme: "pugdom" }),
      scopes: ["read", "write"],
      usePKCE: false,
      responseType: AuthSession.ResponseType.Code,
    },
    { authorizationEndpoint: `${serverUrl}/oauth/authorize` }
  );

  useEffect(() => {
    if (response?.type === "success" && response.params.code) {
      const code = response.params.code;
      (async () => {
        try {
          const accessToken = await getToken(serverUrl, code);
          console.log("Access token:", accessToken);
          const userInfo = await getUserInfo(serverUrl, accessToken);
          console.log("User Info:", userInfo);
          if (userInfo && userInfo.username) {
            const fullUserInfo = { ...userInfo, accessToken, serverUrl };
            await AsyncStorage.setItem(
              "userInfo",
              JSON.stringify(fullUserInfo)
            );
            setAppParam("username", userInfo.username);
            setAppParam("apiBaseUrl", serverUrl);
            setAppParam("accessToken", accessToken);
            navigation.navigate("TabNavigation", {
              screen: "Home",
              params: { username: userInfo.username },
            });
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      })();
    } else if (response?.type === "error") {
      console.error("Error during auth request:", response.error);
    }
  }, [request, response]);

  useEffect(() => {
    if (request) {
      promptAsync({ showInRecents: true });
    }
  }, [request, response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default WebViewScreen;
