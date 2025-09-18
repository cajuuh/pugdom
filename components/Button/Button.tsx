import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Platform,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { PugText } from "../Text/Text";

interface PugButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: React.ReactNode; // Optional: pass an icon/component
}

const PugButton: React.FC<PugButtonProps> = ({
  title,
  style,
  icon,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: theme.secondaryColor,
          shadowColor: theme.secondaryColor,
          borderColor: theme.primaryColor,
        },
        style,
      ]}
      activeOpacity={0.85}
      {...props}
    >
      <View style={styles.inner}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <PugText style={[styles.text, { color: theme.buttonTextColor }]}>
          {title}
        </PugText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1.5,
    elevation: 5,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // Android elevation
    ...Platform.select({
      android: {
        elevation: 4,
      },
    }),
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

export default PugButton;
