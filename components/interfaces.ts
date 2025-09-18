import { ForwardedRef, ReactNode } from "react";
import {
  BottomTabParamList,
  Emoji,
  MediaAttachment,
  Poll,
} from "../screens/types";
import { IconName } from "../utils/Icons";

// src/components/interfaces.ts
export interface TabParams {
  item: {
    route: keyof BottomTabParamList;
    label: string;
    icon: IconName; // Updated to use the Lucide icon names directly
    component: React.ComponentType<any>;
  };
  onPress?: () => void;
  accessibilityState?: { selected: boolean };
}

export interface TabNavigationParams {
  id: undefined;
}

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body: string;
  date: string;
  created_at: string;
  account: {
    id: string;
    username: string;
    avatar: string;
  };
  status?: {
    id: string;
    content: string;
    media_attachments?: MediaAttachment[];
    poll?: Poll;
  };
  media_attachments?: string[];
  poll?: Poll;
  customEmojis?: Emoji[];
}

export interface NotificationCardProps {
  title: string;
  body: string;
  date: string;
  avatar: string;
  username: string;
  media_attachments?: string[];
  poll?: Poll;
  customEmojis?: Emoji[];
}

export interface HomeScreenRef {
  scrollToTop: () => void;
  checkForNewContent: () => Promise<boolean>;
}

export interface StatusActionBarProps {
  statusId: string;
  onReplyPress: (statusId: string) => void;
}

interface TouchableOpacityContainerProps {
  isSelected: boolean;
}

export interface HomeScreenProps {
  replyDrawerRef?: ForwardedRef<any>;
}

export interface SelectedImage {
  uri: string;
  altText: string;
  id?: string;
  mediaId?: string;
}

export interface AltTextDrawerProps {
  image: SelectedImage;
  onSave: (altText: string) => void;
}
export interface ActionBarProps {
  onImageSelect: (uri: string) => void;
  selectedImages: SelectedImage[];
  openPoll: () => void;
}

export interface ReplyDrawerProps {
  statusId: string | null;
}

export interface InstanceInfo {
  uri: string;
  title: string;
  short_description: string;
  description: string;
  email: string;
  version: string;
  urls: {
    streaming_api: string;
  };
  stats: {
    user_count: number;
    status_count: number;
    domain_count: number;
  };
  thumbnail: string;
  languages: string[];
  registrations: boolean;
  approval_required: boolean;
  invites_enabled: boolean;
  configuration: {
    statuses: {
      max_characters: number;
      max_media_attachments: number;
      characters_reserved_per_url: number;
    };
  };
  polls: {
    max_options: number;
    max_characters_per_option: number;
    min_expiration: number;
    max_expiration: number;
  };
  contact_account: {
    id: string;
    username: string;
    url: string;
  };
}

export interface PostParams {
  statusText: string;
  mediaIds?: string[];
  pollData?: {
    options: string[];
    duration: number;
    multiple?: boolean;
    hideTotals?: boolean;
  };
  inReplyToId?: string;
  visibility?: "public" | "unlisted" | "private" | "direct";
  sensitive?: boolean;
  spoilerText?: string;
  language?: string;
}

export interface PollDrawerProps {
  onPollDataChange: (pollData: any) => void;
}

export interface DurationSelectModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (duration: { label: string; value: number }) => void;
}

export interface FeedProviderProps {
  children: ReactNode;
}

export interface AppParams {
  avatar?: string;
  username?: string;
  apiBaseUrl?: string;
  accessToken?: string;
  [key: string]: any;
}

export interface AppContextProps {
  appParams: AppParams;
  setAppParam: (key: string, value: any) => void;
  theme: any;
  updateTheme: (newTheme: string) => void;
  isTabVisible: boolean;
  showTabNavigation: () => void;
  hideTabNavigation: () => void;
  replyStatusId: string;
  setReplyStatus: (id: string) => void;
  instanceInfo: InstanceInfo | null;
  loading: boolean;
}

export interface ThemeType {
  backgroundColor: string;              // App background
  textColor: string;                    // Main text color
  buttonTextColor: string;              // Button text color
  primaryColor: string;                 // Brand/main accent color
  secondaryColor: string;               // Button background color
  secondaryColor50opacity: string;      // Secondary color with opacity
  reblogPillColor: string;              // Reblog/boost pill color
  tabNavigationColor: string;           // Tab bar color
  tabNavigationGradient: string[];      // Tab bar gradient colors
  notificationsIcon: string;            // Notification icon color
  replyDrawerBackgroundColor: string;   // Reply drawer background
  placeholderTextColor: string;         // Input placeholder color
  drawerHandleColor: string;            // Drawer handle color
  activeButtonColor: string;            // Active button state color
  attention: string;                    // Attention/warning color
  noAltTextColor: string;               // For images without alt text
  modalBackground: string;              // Modal background color
  shadowColor?: string;                 // Shadow/elevation color
  borderColor?: string;                 // Input/button border color
  errorColor?: string;                  // Error message color
  successColor?: string;                // Success message color
  disabledColor?: string;               // Disabled state color
  cardBackgroundColor?: string;         // Card container background
  linkColor?: string;                   // Link/interactive text color
  surfaceColor?: string;                // Surface/modal/sheet color
  iconColor?: string;                   // Icon color
}
