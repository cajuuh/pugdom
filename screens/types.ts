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
  account: {
    username: string;
    avatar: string;
    url: string;
  };
  media_attachments: MediaAttachment[];
  reblog?: FeedItem;
  emojis: Emoji[];
  poll?: Poll;
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
  emojis: Emoji[];
  question: string;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Notifications: undefined;
};

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

export type TootCardProps = {
  content: string;
  profileImageUrl: string;
  mediaAttachments: MediaAttachment[];
  username: string;
  serverUrl: string;
  reblog?: FeedItem;
  statusId: string;
  customEmojis: Emoji[];
  onReplyPress: () => void;
  poll?: Poll;
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
};

export type Card = {
  url: string;
  title: string;
  description: string;
  image?: string;
};

// for more information check(https://docs.joinmastodon.org/methods/statuses/#index)
export type TootDetailParams = {
  content: string;
  profileImageUrl: string;
  mediaAttachments: MediaAttachment[];
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
  url: string;
  emojis: Emoji[];
  mentions: Mention[];
  tags: Tag[];
  card?: Card;
};

export type TootScreenRouteProp = RouteProp<RootStackParamList, "TootScreen">;
export type TootScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TootScreen"
>;

export type ThemeProps = {
  theme: ThemeType;
};

export type TootContext = {
  ancestors: Array<any>;
  descendants: Array<any>;
};
