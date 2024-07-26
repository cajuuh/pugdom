import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { BottomTabParamList } from "../screens/types";
import { Icons } from "../utils/Icons";

// src/components/interfaces.ts
export interface TabParams {
  item: {
    route: keyof BottomTabParamList;
    label: string;
    type: keyof typeof Icons; // Ensure this matches the keys in Icons
    activeIcon: string;
    inActiveIcon: string;
    component: React.ComponentType<any>;
  };
  onPress?: () => void;
  accessibilityState?: { selected: boolean };
}

export interface TabNavigationParams {
  id: undefined;
}
