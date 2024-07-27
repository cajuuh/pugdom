import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import SearchScreen from "../../screens/SearchScreen/SearchScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import TabButton from "../TabNavigation/components/TabButton";
import { BottomTabParamList } from "../../screens/types";
import { Icons } from "../../utils/Icons";
import { useNavigation } from "@react-navigation/native";
import NotificationsScreen from "../../screens/NotificationsScreen/NotificationsScreen";

const TabArr: Array<{
  route: keyof BottomTabParamList;
  label: string;
  type: keyof typeof Icons;
  activeIcon: string;
  inActiveIcon: string;
  component: React.ComponentType<any>;
}> = [
  {
    route: "Home",
    label: "Home",
    type: "Ionicons",
    activeIcon: "grid",
    inActiveIcon: "grid-outline",
    component: HomeScreen,
  },
  {
    route: "Search",
    label: "Search",
    type: "FontAwesome",
    activeIcon: "search",
    inActiveIcon: "search",
    component: SearchScreen,
  },
  {
    route: "Notifications",
    label: "Notifications",
    type: "MaterialCommunityIcons",
    activeIcon: "bell",
    inActiveIcon: "bell-outline",
    component: NotificationsScreen,
  },
  {
    route: "Profile",
    label: "Profile",
    type: "FontAwesome",
    activeIcon: "user-circle",
    inActiveIcon: "user-circle-o",
    component: ProfileScreen,
  },
];

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigation: React.FC = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const handleNavigation = (route: keyof BottomTabParamList) => {
    navigation.navigate(route);
  };

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
        {TabArr.map((item, index) => (
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
                  onPress={() => handleNavigation(item.route)}
                  accessibilityState={
                    props.accessibilityState as { selected: boolean }
                  }
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigation;
