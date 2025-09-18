import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
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
import { createStackNavigator } from "@react-navigation/stack";
import TootScreen from "../../screens/TootScreen/TootScreen";

const HomeStack = createStackNavigator();

const Tab = createBottomTabNavigator<BottomTabParamList>();

// Refactor: Pass replyDrawerRef down to HomeScreen via HomeStackNavigator
const HomeStackNavigator: React.FC<{
  replyDrawerRef: React.RefObject<any>;
}> = ({ replyDrawerRef }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="HomeScreen">
        {(props) => <HomeScreen {...props} replyDrawerRef={replyDrawerRef} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="TootScreen" component={TootScreen} />
    </HomeStack.Navigator>
  );
};

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
    component: HomeStackNavigator, // This will be wrapped below with ref
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

const TabNavigation: React.FC = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  const replyDrawerRef = useRef<any>(null);
  const { replyStatusId } = useAppContext();
  const theme = useTheme();

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          zIndex: 1000,
          backgroundColor: theme.backgroundColor,
        }}
      >
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {TabArr.map((item, index) => {
            // Special case: Home tab passes replyDrawerRef
            if (item.route === "Home") {
              return (
                <Tab.Screen
                  key={index}
                  name={item.route}
                  children={() => (
                    <HomeStackNavigator replyDrawerRef={replyDrawerRef} />
                  )}
                  options={{
                    tabBarStyle: {
                      height: 60,
                      position: "relative",
                      marginHorizontal: 16,
                      bottom: 2,
                      paddingBottom: 0,
                      borderTopWidth: 0,
                      borderRadius: 20,
                      backgroundColor: theme.tabNavigationColor,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                      <TabButton
                        {...props}
                        item={item}
                        onPress={() => navigation.navigate(item.route)}
                        accessibilityState={
                          props.accessibilityState as { selected: boolean }
                        }
                      />
                    ),
                  }}
                />
              );
            } else {
              return (
                <Tab.Screen
                  key={index}
                  name={item.route}
                  component={item.component}
                  options={{
                    tabBarStyle: {
                      height: 60,
                      position: "relative",
                      marginHorizontal: 16,
                      bottom: 2,
                      paddingBottom: 0,
                      borderTopWidth: 0,
                      borderRadius: 20,
                      backgroundColor: theme.tabNavigationColor,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                      <TabButton
                        {...props}
                        item={item}
                        onPress={() => navigation.navigate(item.route)}
                        accessibilityState={
                          props.accessibilityState as { selected: boolean }
                        }
                      />
                    ),
                  }}
                />
              );
            }
          })}
        </Tab.Navigator>
        <ReplyDrawer ref={replyDrawerRef} statusId={replyStatusId} />
      </SafeAreaView>
    </>
  );
};

export default TabNavigation;
