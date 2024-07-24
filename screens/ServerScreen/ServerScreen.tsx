import React, { useEffect, useState } from "react";
import { Button, Text } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Container, StyledInput } from "./styles/ServerScreen.style";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Server">;

const ServerScreen: React.FC<Props> = ({ navigation }) => {
  const [server, setServer] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSave = () => {
    let formattedServer = server.trim();
    if (!formattedServer.startsWith("https://")) {
      formattedServer = `https://${formattedServer}`;
    }
    navigation.navigate("WebView", { serverUrl: formattedServer });
  };

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
      <Button onPress={handleSave}>Sign In</Button>
    </Container>
  );
};

export default ServerScreen;
