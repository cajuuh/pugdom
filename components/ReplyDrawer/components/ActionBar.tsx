import React from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomIcon from "../../../utils/Icons";
import { PugText } from "../../Text/Text";
import { useTheme } from "../../../hooks/useTheme";
import { ActionBarProps } from "../../interfaces";

const ActionBar: React.FC<ActionBarProps> = ({ onImageSelect }) => {
  const theme = useTheme();

  // TODO: Add functionalities
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "We need access to your photos to add an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Enable multiple selection
      allowsEditing: false, // Disabling editing when multiple images are selected
      quality: 1,
    });

    if (!result.canceled) {
      // Handle multiple selected images
      result.assets.forEach((asset) => {
        onImageSelect(asset.uri);
      });
    }
  };

  return (
    <View
      style={[
        styles.actionBarContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <TouchableOpacity style={styles.actionButton} onPress={handleImagePicker}>
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
