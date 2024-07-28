import React, { useEffect, useRef } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import CustomIcon, { IconType } from "../../../utils/Icons";
import Colors from "../../../constants/Colors";
import { TabParams } from "../../../components/interfaces";

const TabButton: React.FC<TabParams> = ({
  item,
  onPress,
  accessibilityState,
}) => {
  const focused = accessibilityState?.selected ?? false;
  const viewRef = useRef<Animatable.View & View>(null);
  const circleRef = useRef<Animatable.View & View>(null);

  const animate1 = {
    from: { transform: [{ scaleX: 1 }, { scaleY: 1 }] },
    to: { transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] },
  };

  const animate2 = {
    from: { transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] },
    to: { transform: [{ scaleX: 1 }, { scaleY: 1 }] },
  };

  const circle1 = {
    from: { transform: [{ scaleX: 0.2 }, { scaleY: 0.2 }], opacity: 0.2 },
    to: { transform: [{ scaleX: 1 }, { scaleY: 1 }], opacity: 1 },
  };

  const circle2 = {
    from: { transform: [{ scaleX: 1 }, { scaleY: 1 }], opacity: 1 },
    to: { transform: [{ scaleX: 0.2 }, { scaleY: 0.2 }], opacity: 0.2 },
  };

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate(animate1);
      circleRef.current?.animate(circle1);
    } else {
      viewRef.current?.animate(animate2);
      circleRef.current?.animate(circle2);
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            borderWidth: 1,
            borderRadius: 25,
            padding: 10,
            borderColor: focused ? Colors.primary : Colors.primaryLite,
            backgroundColor: focused ? Colors.primary : "transparent",
          }}
        >
          <Animatable.View
            ref={circleRef}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: focused ? Colors.primaryLite : "transparent",
              position: "absolute",
            }}
          />
          <CustomIcon
            type={item.type as IconType}
            name={focused ? item.activeIcon : item.inActiveIcon}
            color={focused ? Colors.white : Colors.primaryLite}
            size={20}
          />
        </View>
      </Animatable.View>
      <Text
        style={{
          color: focused ? Colors.primary : Colors.primaryLite,
        }}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

export default TabButton;
