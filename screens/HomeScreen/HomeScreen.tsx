import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, FeedItem } from "../types";
import { Container, WelcomeText } from "./styles/HomeScreen.style";
import { getHomeFeed } from "../../services/feedService";
import TootCard from "../../components/TootCard/TootCard";
import TabNavigation from "../../navigation/TabNavigation/TabNavigation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ route }) => {
  const { username } = route.params;
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeFeed = async () => {
      try {
        const feedData = await getHomeFeed();
        setFeed(feedData);
      } catch (error) {
        setError("Error fetching home feed. Please try again.");
        console.error("Error fetching home feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeFeed();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <Container>
        <WelcomeText>Welcome, {username}!</WelcomeText>
        <Text style={{ color: "red" }}>{error}</Text>
      </Container>
    );
  }

  return (
    <Container>
      <WelcomeText>Welcome, {username}!</WelcomeText>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TootCard
            content={item?.content}
            profileImageUrl={item?.account.avatar}
            mediaAttachments={item?.media_attachments}
            username={item?.account?.username}
            serverUrl={item?.account?.url}
            reblog={item?.reblog}
          />
        )}
      />
    </Container>
  );
};

export default HomeScreen;
