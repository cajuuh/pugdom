export type MediaAttachment = {
  id: string;
  type: string;
  url: string;
  preview_url: string;
};

export type Account = {
  id: string;
  username: string;
  avatar: string;
  url: string;
};

export type FeedItem = {
  id: string;
  content: string;
  account: {
    username: string;
    avatar: string;
    url: string;
  };
  media_attachments: any[];
  reblog?: any;
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
};
