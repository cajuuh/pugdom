import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { PugText } from "../../Text/Text";
import PugButton from "../../Button/Button";
import CustomIcon from "../../../utils/Icons";

const CustomHandler = ({
  handleClose,
  handlePost,
}: {
  handleClose: () => void;
  handlePost: () => void;
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.handleContainer,
        {
          backgroundColor: theme.replyDrawerBackgroundColor,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
      ]}
    >
      {/* Handle Icon */}
      <View
        style={[
          styles.handleIcon,
          { backgroundColor: theme.drawerHandleColor },
        ]}
      />

      {/* Close Button */}
      <TouchableOpacity onPress={handleClose}>
        <CustomIcon name="XMarkIcon" color={theme.textColor} size={20} />
      </TouchableOpacity>

      {/* Compose Text */}
      <View style={styles.composeContainer}>
        <PugText style={styles.title}>Compose</PugText>
      </View>

      {/* Post Button */}
      <View style={styles.postButtonContainer}>
        <PugButton
          title="Post"
          onPress={handlePost}
          style={[styles.postButton, { backgroundColor: theme.primaryColor }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  handleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "1.5%",
    paddingHorizontal: "4.5%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  handleIcon: {
    position: "absolute",
    top: 8,
    left: "50%",
    transform: [{ translateX: -20 }],
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  composeContainer: {
    paddingLeft: "6.5%",
  },
  postButtonContainer: {
    left: "25%",
  },
  closeButton: {
    fontSize: 18,
    color: "#000", // Or theme.textColor
  },
  title: {
    fontSize: 18,
  },
  postButton: {
    backgroundColor: "#1DA1F2", // Or theme.primaryColor
  },
});

export default CustomHandler;
