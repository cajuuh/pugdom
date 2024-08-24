import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
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
}
