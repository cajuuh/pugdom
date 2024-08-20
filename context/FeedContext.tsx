import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { FeedItem } from "../screens/types";
import { getHomeFeed } from "../services/feedService";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FeedContextProps {
  feed: FeedItem[];
  setFeed: (feed: FeedItem[]) => void;
  fetchFeed: () => Promise<FeedItem[]>;
  checkForNewContent: () => Promise<boolean>;
}

const FeedContext = createContext<FeedContextProps | undefined>(undefined);

interface FeedProviderProps {
  children: ReactNode;
}

export const FeedProvider: React.FC<FeedProviderProps> = ({ children }) => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  let ws: WebSocket | null = null;

  const fetchFeed = async () => {
    try {
      const feedData = await getHomeFeed();
      setFeed(feedData);
      return feedData;
    } catch (error) {
      console.error("Error fetching home feed:", error);
      throw error;
    }
  };

  const checkForNewContent = async () => {
    try {
      const latestFeedItem = await getHomeFeed({ latestOnly: true });
      if (!feed.length) return false;
      return latestFeedItem && latestFeedItem[0].id !== feed[0].id;
    } catch (error) {
      console.error("Error checking for new content:", error);
      return false;
    }
  };

  const handleWebSocketMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.event === "update") {
      const newToot: FeedItem = JSON.parse(data.payload);
      setFeed((prevFeed) => [newToot, ...prevFeed]);
    }
  };

  useEffect(() => {
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
          // if (error.message.includes("401")) {
          // Handle unauthorized access here (e.g., prompt for re-login)
          // }
        };
      } catch (error) {
        console.error("Error initializing WebSocket:", error);
      }
    };

    initializeWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <FeedContext.Provider
      value={{ feed, setFeed, fetchFeed, checkForNewContent }}
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
