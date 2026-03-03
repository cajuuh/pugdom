import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import HomeScreen from "./HomeScreen";
import { FeedProvider } from "../../context/FeedContext";
import { AppProvider } from "../../context/AppContext";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useIsFocused: () => true,
}));

const mockReplyDrawerRef = {
  current: {
    openSheet: jest.fn(),
  },
};

describe("HomeScreen", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should not show banner when new content is available 5 times", () => {
    const useFeedMock = jest.spyOn(
      require("../../context/FeedContext"),
      "useFeed"
    );

    useFeedMock.mockReturnValue({
      feed: [],
      fetchFeed: jest.fn(),
      hasNewContent: false,
      setHasNewContent: jest.fn(),
    });

    const { rerender, queryByText } = render(
      <AppProvider>
        <FeedProvider>
          <HomeScreen replyDrawerRef={mockReplyDrawerRef} />
        </FeedProvider>
      </AppProvider>
    );

    // Simulate 5 new content updates
    for (let i = 0; i < 5; i++) {
      useFeedMock.mockReturnValue({
        feed: [],
        fetchFeed: jest.fn(),
        hasNewContent: true,
        setHasNewContent: jest.fn(),
      });
      rerender(
        <AppProvider>
          <FeedProvider>
            <HomeScreen replyDrawerRef={mockReplyDrawerRef} />
          </FeedProvider>
        </AppProvider>
      );

      // Reset hasNewContent to false to allow useEffect to trigger on next change
      useFeedMock.mockReturnValue({
        feed: [],
        fetchFeed: jest.fn(),
        hasNewContent: false,
        setHasNewContent: jest.fn(),
      });
      rerender(
        <AppProvider>
          <FeedProvider>
            <HomeScreen replyDrawerRef={mockReplyDrawerRef} />
          </FeedProvider>
        </AppProvider>
      );
    }

    expect(queryByText("New toots")).toBeNull();
  });

  it("should show banner when new content is available more than 5 times", async () => {
    const useFeedMock = jest.spyOn(
      require("../../context/FeedContext"),
      "useFeed"
    );

    useFeedMock.mockReturnValue({
      feed: [],
      fetchFeed: jest.fn(),
      hasNewContent: false,
      setHasNewContent: jest.fn(),
    });

    const { rerender, findByText } = render(
      <AppProvider>
        <FeedProvider>
          <HomeScreen replyDrawerRef={mockReplyDrawerRef} />
        </FeedProvider>
      </AppProvider>
    );

    // Simulate 6 new content updates
    for (let i = 0; i < 6; i++) {
      useFeedMock.mockReturnValue({
        feed: [],
        fetchFeed: jest.fn(),
        hasNewContent: true,
        setHasNewContent: jest.fn(),
      });
      rerender(
        <AppProvider>
          <FeedProvider>
            <HomeScreen replyDrawerRef={mockReplyDrawerRef} />
          </FeedProvider>
        </AppProvider>
      );

      // Reset hasNewContent to false to allow useEffect to trigger on next change
      useFeedMock.mockReturnValue({
        feed: [],
        fetchFeed: jest.fn(),
        hasNewContent: false,
        setHasNewContent: jest.fn(),
      });
      rerender(
        <AppProvider>
          <FeedProvider>
            <HomeScreen replyDrawerRef={mockReplyDrawerRef} />
          </FeedProvider>
        </AppProvider>
      );
    }

    const bannerText = await findByText("New toots");
    expect(bannerText).toBeTruthy();
  });
});
