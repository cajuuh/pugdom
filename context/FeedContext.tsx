import React, { createContext, useState, useContext, ReactNode } from "react";
import { FeedItem } from "../screens/types";
import { getHomeFeed } from "../services/feedService";

interface FeedContextProps {
  feed: FeedItem[];
  setFeed: (feed: FeedItem[]) => void;
  fetchFeed: () => Promise<FeedItem[]>; // Updated to return Promise<FeedItem[]>
  checkForNewContent: () => Promise<boolean>;
}

const FeedContext = createContext<FeedContextProps | undefined>(undefined);

interface FeedProviderProps {
  children: ReactNode;
}

export const FeedProvider: React.FC<FeedProviderProps> = ({ children }) => {
  const [feed, setFeed] = useState<FeedItem[]>([]);

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
      const latestFeed = await getHomeFeed();
      if (!feed.length) return false;
      return latestFeed.length > 0 && latestFeed[0].id !== feed[0].id;
    } catch (error) {
      console.error("Error checking for new content:", error);
      return false;
    }
  };

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
