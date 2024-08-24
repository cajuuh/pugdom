import React from "react";
import { SvgProps } from "react-native-svg";
import { StyleProp, ViewStyle } from "react-native";
import * as LucideIcons from "lucide-react-native";

export type IconName = keyof typeof LucideIcons;

interface CustomIconProps {
  name: IconName;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  color = "#000",
  size = 24,
  style,
}) => {
  const IconComponent = LucideIcons[name] as React.FC<SvgProps>;

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent color={color} width={size} height={size} style={style} />
  );
};

export default CustomIcon;
