import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ThemeType } from "../components/interfaces";

export type MediaAttachment = {
  id: string;
  type: "image" | "video" | "gifv" | "audio" | "unknown";
  url: string;
  preview_url: string;
  remote_url?: string;
  text_url?: string;
  meta: {
    small?: { width: number; height: number; size: string; aspect: number };
    original?: { width: number; height: number; size: string; aspect: number };
  };
  description?: string;
  blurhash?: string;
};

export type Account = {
  id: string;
  username: string;
  display_name: string;
  avatar: string;
  avatar_static: string;
  header: string;
  header_static: string;
  url: string;
  acct: string;
};

export type Emoji = {
  shortcode: string;
  url: string;
  static_url?: string;
  visible_in_picker?: boolean;
};

export type FeedItem = {
  id: string;
  content: string;
  profileImageUrl: string;
  media_attachments: MediaAttachment[];
  username: string;
  account: {
    username: string;
    avatar: string;
    url: string;
  };
  serverUrl: string;
  reblog?: FeedItem;
  statusId: string;
  customEmojis: Emoji[];
  poll?: Poll;
  in_reply_to_id: string | null;
  in_reply_to_account_id: string | null;
  created_at: string;
  sensitive: boolean;
  spoilerText: string;
  visibility: "public" | "unlisted" | "private" | "direct";
  favouritesCount: number;
  reblogsCount: number;
  repliesCount: number;
  accountId: string;
  url: string | undefined;
  emojis: Emoji[];
  mentions: Mention[];
  tags: Tag[];
  card?: Card;
};

export type PollOption = {
  title: string;
  votes_count: number;
};

export type Poll = {
  id: string;
  expires_at: string;
  expired: boolean;
  multiple: boolean;
  votes_count: number;
  voters_count: number;
  options: PollOption[];
  voted: boolean;
  own_votes: number[];
  question: string;
  emojis: Emoji[];
};

// Define your Bottom Tab's param list, including TootScreen with its required params
export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Notifications: undefined;
  TootScreen: { toot: TootDetailParams };
};

// Define TabParams for use in tab navigation
export type TabParams = {
  item: {
    route: keyof BottomTabParamList;
    label: string;
    type: any;
    activeIcon: string;
    inActiveIcon: string;
    component: React.ComponentType<any>;
  };
  onPress: () => void;
  accessibilityState: {
    selected: boolean;
    disabled: boolean;
  };
};

// Root stack params for more complex navigators
export type RootStackParamList = {
  Server: undefined;
  WebView: { serverUrl: string };
  Home: { username: string };
  TabNavigation: {
    screen: keyof BottomTabParamList;
    params?: { username: string };
  };
  ReplyScreen: { statusId: string | null };
  TootScreen: { toot: TootDetailParams };
};

// Define the props for TootCard
export type TootCardProps = {
  content: string;
  profileImageUrl: string;
  media_attachments: MediaAttachment[];
  username: string;
  account: {
    username: string;
    avatar: string;
    url: string;
  };
  serverUrl: string;
  reblog?: FeedItem;
  statusId: string;
  customEmojis: Emoji[];
  poll?: Poll;
  in_reply_to_id: string | null;
  in_reply_to_account_id: string | null;
  created_at: string;
  sensitive: boolean;
  spoilerText: string;
  visibility: "public" | "unlisted" | "private" | "direct";
  favouritesCount: number;
  reblogsCount: number;
  repliesCount: number;
  accountId: string;
  url: string | undefined;
  emojis: Emoji[];
  mentions: Mention[];
  tags: Tag[];
  card?: Card;
  onReplyPress: () => void;
};

export type Mention = {
  id: string;
  username: string;
  acct: string;
  url: string;
};

export type Tag = {
  name: string;
  url: string;
  history: [
    {
      day: string;
      accounts: number;
      uses: number;
    }
  ];
  following: boolean;
};

export type Card = {
  url: string;
  title: string;
  description: string;
  image?: string;
  embed_url?: string;
};

// Define the TootDetailParams for the TootScreen
export type TootDetailParams = {
  content: string;
  profileImageUrl: string;
  account: {
    username: string;
    avatar: string;
    url: string;
  };
  media_attachments: MediaAttachment[];
  username: string;
  serverUrl: string;
  reblog?: FeedItem;
  statusId: string;
  customEmojis: Emoji[];
  poll?: Poll;
  in_reply_to_id: string | null;
  in_reply_to_account_id: string | null;
  createdAt: string;
  sensitive: boolean;
  spoilerText: string;
  visibility: "public" | "unlisted" | "private" | "direct";
  favouritesCount: number;
  reblogsCount: number;
  repliesCount: number;
  accountId: string;
  url: string | undefined;
  emojis: Emoji[];
  mentions: Mention[];
  tags: Tag[];
  card?: Card;
};

// Navigation prop types for TootScreen
export type TootScreenRouteProp = RouteProp<BottomTabParamList, "TootScreen">;
export type TootScreenNavigationProp = StackNavigationProp<
  BottomTabParamList,
  "TootScreen"
>;

// Theme props
export type ThemeProps = {
  theme: ThemeType;
};

// Context type for handling toot-related data
export type TootContext = {
  ancestors: Array<any>;
  descendants: Array<any>;
};
