import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Banner, { BannerRef } from "../../components/Banner/Banner";
import TootCard from "../../components/TootCard/TootCard";
import { HomeScreenProps } from "../../components/interfaces";
import { useAppContext } from "../../context/AppContext";
import { useFeed } from "../../context/FeedContext";
import { useTheme } from "../../hooks/useTheme";
import { Container, WelcomeText } from "./styles/HomeScreen.style";
import CustomIcon from "../../utils/Icons"; // Ensure you have an icon component

const HomeScreen = forwardRef<HomeScreenProps, any>(
  ({ replyDrawerRef, ...props }, ref) => {
    const isFocused = useIsFocused();
    const theme = useTheme();
    const { appParams, setReplyStatus } = useAppContext();
    const { username } = appParams;
    const { feed, fetchFeed, hasNewContent, setHasNewContent } = useFeed();
    const [refreshing, setRefreshing] = useState(false);

    const flatListRef = useRef<FlatList>(null);
    const bannerRef = useRef<BannerRef>(null);

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

    const openReplyDrawer = (statusId: string | null = null) => {
      if (statusId) {
        setReplyStatus(statusId);
      }
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

        <TouchableOpacity
          style={[styles.fab, { backgroundColor: theme.primaryColor }]}
          onPress={() => openReplyDrawer(null)}
        >
          <CustomIcon
            name="PencilSquareIcon"
            size={30}
            color={theme.textColor}
          />
        </TouchableOpacity>
      </Container>
    );
  }
);

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default HomeScreen;
