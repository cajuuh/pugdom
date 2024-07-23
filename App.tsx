import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import ServerScreen from "./screens/ServerScreen/ServerScreen";
import WebViewScreen from "./screens/WebViewScreen/WebViewScreen";
import { config } from "./config";
import * as Linking from "expo-linking";
import { RootStackParamList } from "./screens/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const linking = {
    prefixes: ["pugdom://"],
    config: {
      screens: {
        WebView: "oauthredirect",
      },
    },
  };

  const url = Linking.useURL();

  useEffect(() => {
    if (url) {
      console.log("Initial URL:", url);
    }

    const handleOpenURL = ({ url }: { url: string }) => {
      console.log("Deep link URL:", url);
      // You can also navigate to the specific screen if needed
    };

    const subscription = Linking.addEventListener("url", handleOpenURL);

    return () => {
      subscription.remove();
    };
  }, [url]);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer linking={linking}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
