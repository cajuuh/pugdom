import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Text } from "@ui-kitten/components";
import { NavigationProp } from "@react-navigation/native";
import { Container, StyledInput } from "./styles/ServerScreen.style";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import { config } from "../../config";
import { getToken, getUserInfo } from "../../services/authService";
import { useAppContext } from "../../context/AppContext";

type Props = NativeStackScreenProps<RootStackParamList, "Server">;

const ServerScreen: React.FC<Props> = ({ navigation }) => {
  const [server, setServer] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [authEndpoint, setAuthEndpoint] = useState("");
  const authEndpointRef = useRef(authEndpoint);
  const { setAppParam } = useAppContext();
  const [isAuthEndpointSet, setIsAuthEndpointSet] = useState(false);

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
    {
      authorizationEndpoint:
        !server.startsWith("http://") && !server.startsWith("https://")
          ? "https://" + server + "/oauth/authorize"
          : server + "/oauth/authorize",
    }
  );

  const handleSave = useCallback(async () => {
    let tempServer = server.trim();
    if (
      !tempServer.startsWith("http://") &&
      !tempServer.startsWith("https://")
    ) {
      tempServer = `https://${tempServer}`;
    }
    setServerUrl(tempServer);
    const newAuthEndpoint = `${tempServer}/oauth/authorize`;
    setAuthEndpoint(newAuthEndpoint);
    setIsAuthEndpointSet(true);
    authEndpointRef.current = newAuthEndpoint;

    await AsyncStorage.setItem("serverUrl", tempServer);

    return isAuthEndpointSet;
  }, [server]);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        if (userInfo) {
          setLoading(true);
          const parsedUserInfo = JSON.parse(userInfo);
          navigation.replace("Home", { username: parsedUserInfo.username });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking user authentication:", error);
      }
    };

    checkUserAuthentication();
  }, [navigation]);

  useEffect(() => {
    if (serverUrl && response?.type === "success" && response.params.code) {
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
  }, [response, authEndpoint]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Container>
      <Text category="h1">Set Mastodon Server</Text>
      <StyledInput
        value={server}
        placeholder="Enter your Mastodon server URL"
        onChangeText={(text) => setServer(text)}
      />
      <Button
        onPress={async () => {
          await handleSave().then((data) => {
            if (data) {
              promptAsync({ showInRecents: true });
            }
          });
        }}
      >
        Sign In
      </Button>
    </Container>
  );
};

export default ServerScreen;
