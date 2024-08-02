import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { getToken, getUserInfo } from "../../services/authService";
import { config } from "../../config";
import { useAppContext } from "../../context/AppContext";
import * as WebBrowser from "expo-web-browser";

type Props = NativeStackScreenProps<RootStackParamList, "WebView">;

const WebViewScreen: React.FC<Props> = ({ route, navigation }) => {
  const { serverUrl } = route.params;
  const { setAppParam } = useAppContext();

  WebBrowser.maybeCompleteAuthSession();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: config.CLIENT_ID,
      redirectUri: AuthSession.makeRedirectUri({
        scheme: "pugdom",
      }),
      scopes: ["read", "write", "follow"],
      usePKCE: false,
      responseType: AuthSession.ResponseType.Code,
    },
    { authorizationEndpoint: `${serverUrl}/oauth/authorize` }
  );

  useEffect(() => {
    console.log(
      "redirectUri",
      AuthSession.makeRedirectUri({
        scheme: "pugdom",
      })
    );
    console.log("request =>", request);
    console.log("response =>", response);
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
  }, [response, response, promptAsync]);

  useEffect(() => {
    console.log("response from promptAsync useEffect =>", response),
      promptAsync({ showInRecents: true });
  }, [request, response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default WebViewScreen;
