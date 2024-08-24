import React from "react";
import { SvgProps } from "react-native-svg";
import { StyleProp, ViewStyle } from "react-native";
import * as LucideIcons from "lucide-react-native";
// Importing specific solid icons
import { Heart as SolidHeart } from "lucide-solid"; // Import the specific solid icon you need

type OutlineIconName = keyof typeof LucideIcons;

interface CustomIconProps {
  name: OutlineIconName | "Heart"; // Specify solid icons manually
  solid?: boolean;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  solid = false,
  color = "#000",
  size = 24,
  style,
}) => {
  let IconComponent;

  if (solid && name === "Heart") {
    IconComponent = SolidHeart as React.FC<SvgProps>;
  } else {
    IconComponent = LucideIcons[name as OutlineIconName] as React.FC<SvgProps>;
  }

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent color={color} width={size} height={size} style={style} />
  );
};

export default CustomIcon;
