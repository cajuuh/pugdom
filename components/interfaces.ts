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

export interface ThemeType {
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  reblogPillColor: string;
  tabNavigationColor: string;
  tabNavigationGradient: string[];
  notificationsIcon: string;
  replyDrawerBackgroundColor: string;
  placeholderTextColor: string;
}
