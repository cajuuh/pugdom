import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import Banner, { BannerRef } from "../../components/Banner/Banner";
import TootCard from "../../components/TootCard/TootCard";
import { HomeScreenProps } from "../../components/interfaces";
import { useAppContext } from "../../context/AppContext";
import { useFeed } from "../../context/FeedContext";
import { useTheme } from "../../hooks/useTheme";
import { Container, WelcomeText } from "./styles/HomeScreen.style";

const HomeScreen = forwardRef<HomeScreenProps, any>(({ replyDrawerRef, ...props }, ref) => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const { appParams, setReplyStatus, showTabNavigation } = useAppContext();
  const { username } = appParams;
  const { feed, fetchFeed, hasNewContent, setHasNewContent } = useFeed();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState<string | null>(null);

  const navigation = useNavigation();

  const flatListRef = useRef<FlatList>(null);
  const bannerRef = useRef<BannerRef>(null);

  const appContext = useAppContext();

  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(() => {
    console.log("Theme updated:", theme);
  }, [theme]);

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

  const openReplyDrawer = (statusId: string) => {
    setReplyStatus(statusId);
    replyDrawerRef.current?.openSheet();
  };

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
            customEmojis={item.emojis}
            onReplyPress={() => openReplyDrawer(item.id)}
          />
        )}
        ListFooterComponent={
          refreshing ? (
            <ActivityIndicator size="large" color={theme.primaryColor} />
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
