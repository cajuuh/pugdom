import React from "react";
import { TouchableOpacity } from "react-native";
import CustomIcon, { IconType } from "../../../utils/Icons";
import Colors from "../../../constants/Colors";
import { TabParams } from "../../../components/interfaces";
import { Text } from "@ui-kitten/components";

const TabButton: React.FC<TabParams> = ({
  item,
  onPress,
  accessibilityState,
}) => {
  const focused = accessibilityState?.selected ?? false;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <CustomIcon
        type={item.type as IconType}
        name={focused ? item.activeIcon : item.inActiveIcon}
        color={focused ? Colors.primary : Colors.primaryLite}
        size={20}
      />
      <Text category="label">{item.label}</Text>
    </TouchableOpacity>
  );
};

export default TabButton;
