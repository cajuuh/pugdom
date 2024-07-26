import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Icon, { Icons } from "../../utils/Icons";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import SearchScreen from "../../screens/SearchScreen/SearchScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import { TabParams } from "../../components/interfaces";
import { TouchableOpacityContainer } from "./TabNavigation.style";
import Colors from "../../constants/Colors";
import { BottomTabParamList } from "../../screens/types";

const TabArr: Array<{
  route: keyof BottomTabParamList;
  label: string;
  type: any;
  activeIcon: string;
  inActiveIcon: string;
  component: React.ComponentType<any>;
}> = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Ionicons,
    activeIcon: "grid",
    inActiveIcon: "grid-outline",
    component: HomeScreen,
  },
  {
    route: "Search",
    label: "Search",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "timeline-plus",
    inActiveIcon: "timeline-plus-outline",
    component: SearchScreen,
  },
  {
    route: "Profile",
    label: "Profile",
    type: Icons.FontAwesome,
    activeIcon: "user-circle",
    inActiveIcon: "user-circle-o",
    component: ProfileScreen,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props: TabParams) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<Animatable.View>(null);

  useEffect(() => {
    if (focused && viewRef.current) {
      viewRef.current.animate({
        0: { scaleX: 0.5, transform: [{ rotate: "0deg" }] },
        1: { scaleX: 1.5, transform: [{ rotate: "360deg" }] },
      });
    } else if (viewRef.current) {
      viewRef.current.animate({
        0: { scaleY: 0.5, transform: [{ rotate: "0deg" }] },
        1: { scaleY: 1.5, transform: [{ rotate: "360deg" }] },
      });
    }
  }, [focused]);

  return (
    <TouchableOpacityContainer onPress={onPress} activeOpacity={1}>
      <Animatable.View ref={viewRef} duration={1000}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? Colors.primary : Colors.primaryLite}
        />
      </Animatable.View>
    </TouchableOpacityContainer>
  );
};

const TabNavigation: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: "absolute",
            margin: 16,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => (
                  <TabButton
                    {...props}
                    item={item}
                    onPress={() => console.log("Tab button pressed")}
                    accessibilityState={{ selected: false, disabled: false }}
                  />
                ),
              }}
            />
          );
        })}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigation;
