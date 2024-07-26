import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import ServerScreen from "./screens/ServerScreen/ServerScreen";
import WebViewScreen from "./screens/WebViewScreen/WebViewScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { config } from "./config";
import * as Linking from "expo-linking";
import { RootStackParamList } from "./screens/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActivityIndicator,
  StatusBar,
  useColorScheme,
  View,
} from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | undefined
  >("Home");
  const [loading, setLoading] = useState(true);

  const linking = {
    prefixes: ["pugdom://"],
    config: {
      screens: {
        Server: "server",
        WebView: {
          path: "oauthredirect",
          parse: {
            code: (code: string) => `${code}`,
          },
        },
        Home: "home",
      },
    },
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const userInfo = await AsyncStorage.getItem("userInfo");
      try {
        if (userInfo) {
          setInitialRoute("Home");
        } else {
          setInitialRoute("Server");
        }
      } catch (error) {
        console.error("Error checking user authentication:", error);
        setInitialRoute("Server");
      } finally {
        setLoading(false);
      }
    };

    checkUserAuthentication();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName={"Server"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Server" component={ServerScreen} />
          <Stack.Screen name="WebView" component={WebViewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
