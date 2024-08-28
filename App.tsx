import { PTSans_400Regular, PTSans_700Bold, useFonts } from "@expo-google-fonts/pt-sans";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { PugText, PugTextInput } from "./components/Text/Text";
import { AppProvider, useAppContext } from "./context/AppContext";
import { FeedProvider } from "./context/FeedContext";
import TabNavigation from "./navigation/TabNavigation/TabNavigation";
import ServerScreen from "./screens/ServerScreen/ServerScreen";
import WebViewScreen from "./screens/WebViewScreen/WebViewScreen";
import { RootStackParamList } from "./screens/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const { theme } = useAppContext();

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={theme.backgroundColor === "#1C1C1E" ? "light-content" : "dark-content"}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="Server" component={ServerScreen} />
          <Stack.Screen name="WebView" component={WebViewScreen} />
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
    <AppProvider>
      <FeedProvider>
        <AppContent />
      </FeedProvider>
    </AppProvider>
  );
};

export default App;
