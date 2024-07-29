import React, { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { Container } from "./styles/WebViewScreen.style";
import { ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { getToken, getUserInfo } from "../../services/authService";
import { config } from "../../config";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../../context/AppContext";

type Props = NativeStackScreenProps<RootStackParamList, "WebView">;

const WebViewScreen: React.FC<Props> = ({ route, navigation }) => {
  const { serverUrl } = route.params;
  const webViewRef = useRef<WebView>(null);
  const { setAppParam } = useAppContext();

  const handleOpenURL = async (url: string) => {
    console.log("Received deep link URL:", url);
    const parsedUrl = Linking.parse(url);
    const { queryParams } = parsedUrl;

    if (queryParams?.code) {
      const code = Array.isArray(queryParams.code)
        ? queryParams.code[0]
        : queryParams.code;
      console.log("Authorization code:", code);
      try {
        const accessToken = await getToken(serverUrl, code);
        console.log("Access token:", accessToken);
        const userInfo = await getUserInfo(serverUrl, accessToken);
        console.log("User Info:", userInfo);
        if (userInfo && userInfo.username) {
          const fullUserInfo = { ...userInfo, accessToken, serverUrl };
          await AsyncStorage.setItem("userInfo", JSON.stringify(fullUserInfo));
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
    } else {
      console.log("No authorization code found in URL");
    }
  };

  return (
    <Container>
      <WebView
        ref={webViewRef}
        source={{
          uri: `${serverUrl}/oauth/authorize?response_type=code&client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&scope=read+write`,
        }}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" />}
        onNavigationStateChange={({ url }) => {
          handleOpenURL(url);
        }}
      />
    </Container>
  );
};

export default WebViewScreen;
