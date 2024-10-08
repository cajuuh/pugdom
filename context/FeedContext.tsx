import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FeedProviderProps } from "../components/interfaces";
import { Emoji, FeedItem } from "../screens/types";
import { getHomeFeed } from "../services/feedService";

interface FeedContextProps {
  feed: FeedItem[];
  customEmojis: Emoji[];
  setFeed: (feed: FeedItem[]) => void;
  fetchFeed: () => Promise<FeedItem[]>;
  checkForNewContent: () => Promise<boolean>;
  hasNewContent: boolean;
  setHasNewContent: (value: boolean) => void;
  autoUpdate: boolean;
  setAutoUpdate: (value: boolean) => void;
}

const FeedContext = createContext<FeedContextProps | undefined>(undefined);

export const FeedProvider: React.FC<FeedProviderProps> = ({ children }) => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [customEmojis, setCustomEmojis] = useState<Emoji[]>([]);
  const [autoUpdate, setAutoUpdate] = useState<boolean>(false);
  const [hasNewContent, setHasNewContent] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let ws: WebSocket | null = null;

  useEffect(() => {
    const loadPreference = async () => {
      const storedPreference = await AsyncStorage.getItem(
        "autoUpdatePreference"
      );
      setAutoUpdate(storedPreference === "true");
    };
    loadPreference();
  }, []);

  const fetchFeed = async () => {
    await handleSignIn();
    try {
      const { feedItems, customEmojis } = await getHomeFeed();
      setFeed(feedItems);
      setCustomEmojis(customEmojis);
      return feedItems;
    } catch (error) {
      console.error("Error fetching home feed:", error);
      throw error;
    }
  };

  const checkForNewContent = async () => {
    try {
      const latestFeedItem = await getHomeFeed({ latestOnly: true });
      if (!feed.length) return false;
      return latestFeedItem && latestFeedItem.feedItems[0]?.id !== feed[0].id;
    } catch (error) {
      console.error("Error checking for new content:", error);
      return false;
    }
  };

  const handleWebSocketMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.event === "update") {
      const newToot: FeedItem = JSON.parse(data.payload);
      if (autoUpdate) {
        setFeed((prevFeed) => [newToot, ...prevFeed]);
      } else {
        setHasNewContent(true);
      }
    }
  };

  const handleSignIn = async () => {
    const userInfoString = await AsyncStorage.getItem("userInfo");
    userInfoString ? setIsAuthenticated(true) : setIsAuthenticated(false);
  };

  const initializeWebSocket = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem("userInfo");
      if (!userInfoString) {
        console.error("User not authenticated");
        return;
      }

      const { accessToken, serverUrl } = JSON.parse(userInfoString);
      if (!accessToken || !serverUrl) {
        console.error("Access token or server URL is missing");
        return;
      }

      ws = new WebSocket(
        `${serverUrl}/api/v1/streaming?stream=user&access_token=${accessToken}`
      );

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = handleWebSocketMessage;

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Error initializing WebSocket:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      initializeWebSocket();
    }
  }, [isAuthenticated]);

  return (
    <FeedContext.Provider
      value={{
        feed,
        customEmojis,
        setFeed,
        fetchFeed,
        checkForNewContent,
        autoUpdate,
        setAutoUpdate,
        hasNewContent,
        setHasNewContent,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = (): FeedContextProps => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error("useFeed must be used within a FeedProvider");
  }
  return context;
};
