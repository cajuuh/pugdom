import React, { useState } from "react";
import { Button, Text } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Container, StyledInput } from "./styles/ServerScreen.style";
import { RootStackParamList } from "../types";

const ServerScreen = () => {
  const [server, setServer] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSave = () => {
    let formattedServer = server.trim();
    if (!formattedServer.startsWith("https://")) {
      formattedServer = `https://${formattedServer}`;
    }
    // Navigate to WebViewScreen with the server URL
    navigation.navigate("WebView", { serverUrl: formattedServer });
  };

  return (
    <Container>
      <Text category="h1">Set Mastodon Server</Text>
      <StyledInput
        placeholder="Enter your Mastodon server URL"
        value={server}
        onChangeText={setServer}
      />
      <Button onPress={handleSave}>Save</Button>
    </Container>
  );
};

export default ServerScreen;
