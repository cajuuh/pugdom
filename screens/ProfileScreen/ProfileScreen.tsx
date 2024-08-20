import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen: React.FC = () => {
  const [autoUpdate, setAutoUpdate] = useState<boolean>(false);

  useEffect(() => {
    // Load the preference when the screen loads
    const loadPreference = async () => {
      const storedPreference = await AsyncStorage.getItem(
        "autoUpdatePreference"
      );
      setAutoUpdate(storedPreference === "true");
    };
    loadPreference();
  }, []);

  const toggleSwitch = async () => {
    setAutoUpdate((previousState) => !previousState);
    await AsyncStorage.setItem(
      "autoUpdatePreference",
      (!autoUpdate).toString()
    );
  };

  return (
    <View style={styles.container}>
      <Text>Automatically Update Timeline</Text>
      <Switch onValueChange={toggleSwitch} value={autoUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
