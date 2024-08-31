import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CustomIcon from "../../../utils/Icons";
import { PugText } from "../../Text/Text";
import { useTheme } from "../../../hooks/useTheme";

const ActionBar = () => {
  const theme = useTheme();

  // TODO: Add functionalities

  return (
    <View
      style={[
        styles.actionBarContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => console.log("Add Image")}
      >
        <CustomIcon name="PhotoIcon" size={24} color={theme.textColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => console.log("Add GIF")}
      >
        <PugText style={{ color: theme.textColor }}>GIF</PugText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => console.log("Add Mention")}
      >
        <CustomIcon name="AtSymbolIcon" size={24} color={theme.textColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => console.log("Add Hashtag")}
      >
        <CustomIcon name="HashtagIcon" size={24} color={theme.textColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => console.log("Toggle Content Warning")}
      >
        <CustomIcon
          name="ExclamationTriangleIcon"
          size={24}
          color={theme.textColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => console.log("Add Poll")}
      >
        <CustomIcon name="ChartBarIcon" size={24} color={theme.textColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionBarContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default ActionBar;
