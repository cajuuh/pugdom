import {
  PTSans_400Regular,
  PTSans_700Bold,
  useFonts,
} from "@expo-google-fonts/pt-sans";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { PugText, PugTextInput } from "./components/Text/Text";
import { AppProvider, useAppContext } from "./context/AppContext";
import { FeedProvider } from "./context/FeedContext";
import TabNavigation from "./navigation/TabNavigation/TabNavigation";
import ReplyScreen from "./screens/ReplyScreen/ReplyScreen";
import ServerScreen from "./screens/ServerScreen/ServerScreen";
import WebViewScreen from "./screens/WebViewScreen/WebViewScreen";
import { RootStackParamList } from "./screens/types";

const AppContent = () => {
  const { theme } = useAppContext();

  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const Stack = createNativeStackNavigator<RootStackParamList>();

  const { setAppParam } = useAppContext();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const userInfo = await AsyncStorage.getItem("userInfo");
      try {
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          setAppParam("username", parsedUserInfo.username);
          setAppParam("avatar", parsedUserInfo.avatar);
          setAppParam("apiBaseUrl", parsedUserInfo.serverUrl);
          setAppParam("accessToken", parsedUserInfo.accessToken);
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
  }, [loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={
          theme.backgroundColor === "#1C1C1E" ? "light-content" : "dark-content"
        }
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="Server" component={ServerScreen} />
          <Stack.Screen name="WebView" component={WebViewScreen} />
          <Stack.Screen
            name="ReplyScreen"
            component={ReplyScreen}
            options={{
              presentation: "modal",
              gestureEnabled: true,
              animationTypeForReplace: "push",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  PugText.defaultProps = PugText.defaultProps || {};
  PugText.defaultProps.style = { fontFamily: "PTSans_400Regular" };

  PugTextInput.defaultProps = PugTextInput.defaultProps || {};
  PugTextInput.defaultProps.style = { fontFamily: "PTSans_400Regular" };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <FeedProvider>
          <AppContent />
        </FeedProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
};

export default App;
