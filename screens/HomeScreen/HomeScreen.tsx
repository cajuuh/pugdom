import React, { useEffect, useRef, useState, forwardRef } from "react";
import { FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { Container, WelcomeText } from "./styles/HomeScreen.style";
import TootCard from "../../components/TootCard/TootCard";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "@ui-kitten/components";
import { useFeed } from "../../context/FeedContext";
import { useIsFocused } from "@react-navigation/native";
import Banner, { BannerRef } from "../../components/Banner/Banner";

const HomeScreen = forwardRef((props, ref) => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const { appParams } = useAppContext();
  const { username } = appParams;
  const { feed, fetchFeed, hasNewContent, setHasNewContent } = useFeed();
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const bannerRef = useRef<BannerRef>(null);

  useEffect(() => {
    fetchFeed();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFeed();
    setRefreshing(false);
    setHasNewContent(false);
    bannerRef.current?.hideBanner();
  };

  useEffect(() => {
    if (hasNewContent) {
      console.log("New content detected, showing banner...");
      bannerRef.current?.showBanner();
    }
  }, [hasNewContent]);

  return (
    <Container theme={theme}>
      <WelcomeText theme={theme}>Welcome, {username}!</WelcomeText>

      {isFocused && <Banner ref={bannerRef} onRefresh={onRefresh} />}

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
            statusId={item.id}
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
});

export default HomeScreen;
