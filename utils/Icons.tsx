import React from "react";
import { SvgProps } from "react-native-svg";
import { StyleProp, ViewStyle } from "react-native";
import * as OutlineIcons from "react-native-heroicons/outline";
import * as SolidIcons from "react-native-heroicons/solid";

export type IconName = keyof typeof OutlineIcons | keyof typeof SolidIcons;

interface CustomIconProps {
  name: IconName;
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
  const IconComponent = solid
    ? (SolidIcons[name] as React.FC<SvgProps>)
    : (OutlineIcons[name] as React.FC<SvgProps>);

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent color={color} width={size} height={size} style={style} />
  );
};

export default CustomIcon;
