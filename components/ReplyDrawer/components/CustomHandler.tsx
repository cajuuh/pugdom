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
          borderBottomColor: theme.placeholderTextColor,
          backgroundColor: theme.replyDrawerBackgroundColor,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
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
        <PugText style={[styles.title, { color: theme.textColor }]}>
          Compose
        </PugText>
      </View>

      {/* Post Button */}
      <View style={styles.postButtonContainer}>
        <PugButton
          title="Post"
          onPress={handlePost}
          style={[
            styles.postButton,
            { backgroundColor: theme.notificationsIcon },
          ]}
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
  title: {
    fontSize: 18,
  },
  postButton: {
    backgroundColor: "#1DA1F2",
  },
});

export default CustomHandler;
