export type MediaAttachment = {
  id: string;
  type: 'image' | 'video' | 'gifv' | 'audio' | 'unknown';
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
  emojis: {
    shortcode: string;
    url: string;
    static_url: string;
    visible_in_picker: boolean;
  }[];
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
};
