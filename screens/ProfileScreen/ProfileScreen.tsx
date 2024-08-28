import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { PugText } from "../../components/Text/Text";
import { useAppContext } from "../../context/AppContext";
import { darkTheme, lightTheme } from "../../themes";


const ProfileScreen: React.FC = () => {
  const { theme, updateTheme } = useAppContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <PugText style={{ color: theme.textColor }}>Automatically Update Timeline</PugText>
      <Switch
        onValueChange={() => { }}
        value={true}
        thumbColor={theme.primaryColor}
      />

      <View style={styles.themeContainer}>
        <PugText style={[styles.themeTitle, { color: theme.textColor }]}>Select Theme</PugText>
        <TouchableOpacity onPress={() => updateTheme('light')}>
          <Text style={[
            styles.themeOption,
            { color: theme.textColor, backgroundColor: theme.backgroundColor },
            theme === lightTheme && styles.selected
          ]}>
            Light
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateTheme('dark')}>
          <PugText style={[
            styles.themeOption,
            { color: theme.textColor, backgroundColor: theme.backgroundColor },
            theme === darkTheme && styles.selected
          ]}>
            Dark
          </PugText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateTheme('system')}>
          <PugText style={[
            styles.themeOption,
            { color: theme.textColor, backgroundColor: theme.backgroundColor },
            theme === 'system' && styles.selected
          ]}>
            Match System
          </PugText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  themeContainer: {
    marginTop: 20,
  },
  themeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  themeOption: {
    fontSize: 16,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: "center",
  },
  selected: {
    backgroundColor: "#0000ff", // Blue for selected option
    color: "#ffffff", // White text for selected option
  },
});

export default ProfileScreen;
