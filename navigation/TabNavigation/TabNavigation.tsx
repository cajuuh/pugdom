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
import { Icons } from "../../utils/Icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { HomeScreenRef } from "../../components/interfaces";

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
  const [currentRoute, setCurrentRoute] = useState("");
  const navigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  const homeScreenRef = useRef<HomeScreenRef>(null);

  const handleNavigation = (route: keyof BottomTabParamList) => {
    setCurrentRoute(route);
    if (route === "Home") {
      if (currentRoute === "Home") {
        homeScreenRef.current?.scrollToTop();
      } else {
        navigation.navigate(route);
      }
    } else {
      navigation.navigate(route);
    }
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
