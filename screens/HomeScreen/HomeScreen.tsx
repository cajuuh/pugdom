import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import { FeedItem } from "../types";
import { Container, WelcomeText } from "./styles/HomeScreen.style";
import { getHomeFeed } from "../../services/feedService";
import TootCard from "../../components/TootCard/TootCard";
import { useAppContext } from "../../context/AppContext";

const HomeScreen: React.FC = () => {
  const { appParams } = useAppContext();
  const { username } = appParams;
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state
  const [error, setError] = useState<string | null>(null);

  const fetchHomeFeed = useCallback(async () => {
    try {
      const feedData = await getHomeFeed();
      setFeed(feedData);
    } catch (error) {
      setError("Error fetching home feed. Please try again.");
      console.error("Error fetching home feed:", error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Ensure refreshing state is reset
    }
  }, []);

  useEffect(() => {
    fetchHomeFeed();
  }, [fetchHomeFeed]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHomeFeed();
  }, [fetchHomeFeed]);

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
            content={item.content}
            profileImageUrl={item.account.avatar}
            mediaAttachments={item.media_attachments}
            username={item.account.username}
            serverUrl={item.account.url}
            reblog={item.reblog}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Container>
  );
};

export default HomeScreen;
