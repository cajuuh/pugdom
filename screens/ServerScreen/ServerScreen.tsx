import React, { useEffect, useState, useCallback } from "react";
import { Button, Text } from "@ui-kitten/components";
import { NavigationProp } from "@react-navigation/native";
import { Container, StyledInput } from "./styles/ServerScreen.style";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import { config } from "../../config";

type Props = NativeStackScreenProps<RootStackParamList, "Server">;

const ServerScreen: React.FC<Props> = ({ navigation }) => {
  const [server, setServer] = useState("");
  const [loading, setLoading] = useState(true);
  const [authEndpoint, setAuthEndpoint] = useState("");

  const handleSave = useCallback(async () => {
    let tempServer = server.trim();
    if (
      !tempServer.startsWith("http://") &&
      !tempServer.startsWith("https://")
    ) {
      tempServer = `https://${tempServer}`;
    }
    await AsyncStorage.setItem("serverUrl", tempServer);
    setAuthEndpoint(`${tempServer}/oauth/authorize`);
  }, [server]);

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
    { authorizationEndpoint: authEndpoint }
  );

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
    console.log("Response: ", response);
  }, [response]);

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
        placeholder="Enter your Mastodon server URL"
        value={server}
        onChangeText={setServer}
      />
      <Button
        onPress={async () => {
          await handleSave();
          promptAsync({ showInRecents: true });
        }}
      >
        Sign In
      </Button>
    </Container>
  );
};

export default ServerScreen;
