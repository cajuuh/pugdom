import React, { useState, useRef } from "react";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import SearchScreen from "../../screens/SearchScreen/SearchScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import NotificationsScreen from "../../screens/NotificationsScreen/NotificationsScreen";
import TabButton from "../TabNavigation/components/TabButton";
import { BottomTabParamList } from "../../screens/types";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenRef } from "../../components/interfaces";
import { IconName } from "../../utils/Icons";

const TabArr: Array<{
  route: keyof BottomTabParamList;
  label: string;
  icon: IconName;
  component: React.ComponentType<any>;
}> = [
  {
    route: "Home",
    label: "Home",
    icon: "HomeIcon",
    component: HomeScreen,
  },
  {
    route: "Search",
    label: "Search",
    icon: "MagnifyingGlassIcon",
    component: SearchScreen,
  },
  {
    route: "Notifications",
    label: "Notifications",
    icon: "BellIcon",
    component: NotificationsScreen,
  },
  {
    route: "Profile",
    label: "Profile",
    icon: "UserCircleIcon",
    component: ProfileScreen,
  },
];

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigation: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState("");
  const navigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  const homeScreenRef = useRef<HomeScreenRef>(null);

  const handleNavigation = async (route: keyof BottomTabParamList) => {
    setCurrentRoute(route);
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: "absolute", // This is fine but might cause layout issues if not handled properly
            marginHorizontal: 16, // Change to marginHorizontal instead of margin to avoid top/bottom issues
            bottom: 20, // Explicitly set the bottom position to control the tab bar's location
            paddingBottom: 0, // Remove paddingBottom if it’s not necessary
            borderRadius: 16,
            backgroundColor: "#ffffff", // Ensure the background color is consistent
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        {TabArr.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.route}
            component={
              item.route === "Home"
                ? (props: any) => <HomeScreen ref={homeScreenRef} {...props} />
                : item.component
            }
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
