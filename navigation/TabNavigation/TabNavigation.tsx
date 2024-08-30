import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native";
import ReplyDrawer from "../../components/ReplyDrawer/ReplyDrawer";
import { HomeScreenRef } from "../../components/interfaces";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../hooks/useTheme";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import NotificationsScreen from "../../screens/NotificationsScreen/NotificationsScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import SearchScreen from "../../screens/SearchScreen/SearchScreen";
import { BottomTabParamList } from "../../screens/types";
import { IconName } from "../../utils/Icons";
import TabButton from "../TabNavigation/components/TabButton";

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
  const { isTabVisible, replyStatusId } = useAppContext();
  const replyDrawerRef = useRef<any>(null);

  useEffect(() => {
    console.log('is tab visible now? ', isTabVisible);
  }, [isTabVisible]);

  const handleNavigation = async (route: keyof BottomTabParamList) => {
    setCurrentRoute(route);
    navigation.navigate(route);
  };

  const theme = useTheme();


  return (
    <>
      <SafeAreaView style={{ flex: 1, zIndex: 1000 }}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 55,
              position: "relative",
              marginHorizontal: 16,
              bottom: 15,
              paddingBottom: 0,
              borderTopWidth: 0,
              borderRadius: 20,
              backgroundColor: theme.tabNavigationColor,
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
                  ? (props: any) => <HomeScreen ref={homeScreenRef} replyDrawerRef={replyDrawerRef} {...props} />
                  : item.component
              }
              options={{
                tabBarStyle: false,
                tabBarShowLabel: false,
                tabBarButton: (props) => (
                  <TabButton
                    {...props}
                    item={item}
                    onPress={() => handleNavigation(item.route)}
                    accessibilityState={props.accessibilityState as { selected: boolean }}
                  />
                ),
              }}
            />
          ))}
        </Tab.Navigator>
        <ReplyDrawer
          ref={replyDrawerRef}
          statusId={replyStatusId}
        />
      </SafeAreaView>
    </>
  );
};

export default TabNavigation;
