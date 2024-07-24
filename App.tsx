import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import ServerScreen from "./screens/ServerScreen/ServerScreen";
import WebViewScreen from "./screens/WebViewScreen/WebViewScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { config } from "./config";
import * as Linking from "expo-linking";
import { RootStackParamList } from "./screens/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const linking = {
    prefixes: ["pugdom://"],
    config: {
      screens: {
        Server: "callback",
      },
    },
  };

  useEffect(() => {
    const handleOpenURL = ({ url }: { url: string }) => {
      console.log("Deep link URL:", url);
    };

    const getInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        console.log("Initial URL:", initialURL);
        handleOpenURL({ url: initialURL });
      }
    };

    getInitialURL();

    const subscription = Linking.addEventListener("url", handleOpenURL);
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer
        linking={linking}
        onReady={() => {
          console.log("NavigationContainer ready");
        }}
        onStateChange={(state) => {
          console.log("Navigation state changed:", state);
        }}
      >
        <Stack.Navigator initialRouteName="Server">
          <Stack.Screen
            name="Server"
            component={ServerScreen}
            options={{ title: "Mastodon Server" }}
          />
          <Stack.Screen
            name="WebView"
            component={WebViewScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
