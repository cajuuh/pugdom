import React, { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { Container, WelcomeText } from "./styles/HomeScreen.style";
import TootCard from "../../components/TootCard/TootCard";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "@ui-kitten/components";
import { useFeed } from "../../context/FeedContext";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Banner, { BannerRef } from "../../components/Banner/Banner";

const HomeScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const { appParams } = useAppContext();
  const { username } = appParams;
  const { feed, fetchFeed, checkForNewContent } = useFeed();
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const bannerRef = useRef<BannerRef>(null);
  const [autoUpdate, setAutoUpdate] = useState<boolean>(false);

  useEffect(() => {
    // Load user preference
    const loadPreference = async () => {
      const storedPreference = await AsyncStorage.getItem(
        "autoUpdatePreference"
      );
      setAutoUpdate(storedPreference === "true");
    };
    loadPreference();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isFocused) {
        checkForNewContent().then((hasNewContent) => {
          if (hasNewContent) {
            if (autoUpdate) {
              fetchFeed(); // Automatically update the feed
            } else {
              bannerRef.current?.showBanner(); // Show banner notification
            }
          }
        });
      }
    }, 120000); // Check every 2 minutes

    return () => clearInterval(intervalId);
  }, [checkForNewContent, isFocused, autoUpdate]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeed().finally(() => setRefreshing(false));
  };

  return (
    <Container theme={theme}>
      <WelcomeText theme={theme}>Welcome, {username}!</WelcomeText>

      <Banner ref={bannerRef} onRefresh={onRefresh} />

      <FlatList
        ref={flatListRef}
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
        ListFooterComponent={
          refreshing ? (
            <ActivityIndicator
              size="large"
              color={theme["color-primary-500"]}
            />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Container>
  );
};

export default HomeScreen;
