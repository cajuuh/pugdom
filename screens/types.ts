export type MediaAttachment = {
  id: string;
  type: string;
  url: string;
  preview_url: string;
};

export type Account = {
  id: string;
  username: string;
  avatar: string; // URL to the profile picture
};

export type FeedItem = {
  id: string;
  content: string;
  account: Account;
  media_attachments: MediaAttachment[];
  reblog?: FeedItem; // Add the reblog property
};

export type RootStackParamList = {
  Server: undefined;
  WebView: { serverUrl: string };
  Home: { username: string };
};
