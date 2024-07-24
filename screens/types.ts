export type FeedItem = {
  id: string;
  content: string;
};

export type RootStackParamList = {
  Server: undefined;
  WebView: { serverUrl: string };
  Home: { username: string };
};
