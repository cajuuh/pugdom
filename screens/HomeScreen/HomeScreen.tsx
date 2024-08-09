import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useState,
} from "react";
import {
  FlatList,
  View,
  Text,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Container, WelcomeText } from "./styles/HomeScreen.style";
import TootCard from "../../components/TootCard/TootCard";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "@ui-kitten/components";
import { HomeScreenRef } from "../../components/interfaces";
import { useFeed } from "../../context/FeedContext";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen: ForwardRefRenderFunction<HomeScreenRef, {}> = (
  props,
  ref
) => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const { appParams } = useAppContext();
  const { username } = appParams;
  const { feed, fetchFeed, checkForNewContent } = useFeed();
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isFocused) {
        checkForNewContent().then((hasNewContent) => {
          if (hasNewContent) {
            Alert.alert(
              "New Content Available",
              "Would you like to refresh the feed now?",
              [
                { text: "Not Now", style: "cancel" },
                { text: "Refresh", onPress: () => onRefresh() },
              ]
            );
          }
        });
      }
    }, 120000);

    return () => clearInterval(intervalId);
  }, [checkForNewContent, isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeed().finally(() => setRefreshing(false));
  };

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      onRefresh();
    },
    checkForNewContent,
  }));

  return (
    <Container theme={theme}>
      <WelcomeText theme={theme}>Welcome, {username}!</WelcomeText>
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

export default React.forwardRef(HomeScreen);
