import { ForwardedRef } from "react";
import { BottomTabParamList } from "../screens/types";
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
  account: {
    id: string;
    username: string;
    avatar: string;
  };
  status?: {
    id: string;
    content: string;
  };
  mediaAttachments?: string[];
}

export interface NotificationCardProps {
  title: string;
  body: string;
  date: string;
  avatar: string;
  username: string;
  mediaAttachments?: string[];
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
}

export interface AltTextDrawerProps {
  image: SelectedImage;
  onSave: (altText: string) => void;
}
export interface ActionBarProps {
  onImageSelect: (uri: string) => void;
  selectedImages: SelectedImage[];
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
  contact_account: {
    id: string;
    username: string;
    url: string;
  };
}

export interface ThemeType {
  backgroundColor: string;
  textColor: string;
  buttonTextColor: string;
  primaryColor: string;
  secondaryColor: string;
  reblogPillColor: string;
  tabNavigationColor: string;
  tabNavigationGradient: string[];
  notificationsIcon: string;
  replyDrawerBackgroundColor: string;
  placeholderTextColor: string;
  drawerHandleColor: string;
  activeButtonColor: string;
  attention: string;
  secondaryColor50opacity: string;
  noAltTextColor: string;
}
