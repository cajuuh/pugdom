import React, { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import { Container } from "./styles/WebViewScreen.style";
import { ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { getToken, getUserInfo } from "../../services/authService";
import { config } from "../../config";
import * as Linking from "expo-linking";

type Props = NativeStackScreenProps<RootStackParamList, "WebView">;

const WebViewScreen: React.FC<Props> = ({ route }) => {
  const { serverUrl } = route.params;
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    const handleOpenURL = async ({ url }: { url: string }) => {
      const parsedUrl = Linking.parse(url);
      const { queryParams } = parsedUrl;

      if (queryParams?.code) {
        const code = Array.isArray(queryParams.code)
          ? queryParams.code[0]
          : queryParams.code;
        try {
          const accessToken = await getToken(serverUrl, code);
          const userInfo = await getUserInfo(serverUrl, accessToken);
          console.log("User Info:", userInfo);
          // Handle the user info, such as updating state or navigating to another screen
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleOpenURL);

    return () => {
      subscription.remove();
    };
  }, [serverUrl]);

  return (
    <Container>
      <WebView
        ref={webViewRef}
        source={{
          uri: `${serverUrl}/oauth/authorize?response_type=code&client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&scope=read+write`,
        }}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" />}
      />
    </Container>
  );
};

export default WebViewScreen;
