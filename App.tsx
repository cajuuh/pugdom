import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import ServerScreen from "./screens/ServerScreen/ServerScreen";
import WebViewScreen from "./screens/WebViewScreen/WebViewScreen";
import TabNavigation from "./navigation/TabNavigation/TabNavigation"; // Ensure correct path
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActivityIndicator,
  StatusBar,
  useColorScheme,
  View,
} from "react-native";
import { AppProvider, useAppContext } from "./context/AppContext";
import { RootStackParamList } from "./screens/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const { setAppParam } = useAppContext();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const userInfo = await AsyncStorage.getItem("userInfo");
      try {
        if (userInfo) {
          setAppParam("username", JSON.parse(userInfo).username);
          setInitialRoute("TabNavigation");
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
  }, [setAppParam]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="Server" component={ServerScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ApplicationProvider>
  );
};

export default App;
