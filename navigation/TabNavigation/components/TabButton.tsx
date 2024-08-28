import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import { TabParams } from "../../../components/interfaces";
import Colors from "../../../constants/Colors";
import CustomIcon from "../../../utils/Icons";
import {
  AnimatedCircle,
  AnimatedContainer,
  IconWrapper,
  Label,
  TouchableContainer,
} from "./TabButton.style";

const TabButton: React.FC<TabParams> = ({
  item,
  onPress,
  accessibilityState,
}) => {
  const focused = accessibilityState?.selected ?? false;
  const viewRef = useRef<Animatable.View & View>(null);
  const circleRef = useRef<Animatable.View & View>(null);

  const animate1 = {
    from: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
    to: { transform: [{ scaleX: 1 }, { scaleY: 1 }] },
  };

  const animate2 = {
    from: { transform: [{ scaleX: 1 }, { scaleY: 1 }] },
    to: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  };

  const circle1 = {
    from: { transform: [{ scaleX: 0.2 }, { scaleY: 0.2 }], opacity: 1 },
    to: { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }], opacity: 1 },
  };

  const circle2 = {
    from: { transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], opacity: 1 },
    to: { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }], opacity: 1 },
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
    <TouchableContainer onPress={onPress} activeOpacity={1}>
      <AnimatedContainer ref={viewRef} duration={500}>
        <LinearGradient
          colors={focused ? ["#2F80ED", "#2D9EE0"] : ["#ffffff", "#ffffff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ borderRadius: 50 }}
        >
          <IconWrapper focused={focused}>
            <AnimatedCircle focused={focused} ref={circleRef} />
            <CustomIcon
              name={item.icon}
              solid={focused} // Solid icon when focused
              color={focused ? Colors.white : Colors.primaryLite}
              size={22}
            />
          </IconWrapper>
        </LinearGradient>
      </AnimatedContainer>
      <Label focused={focused}>
        {item.label}
      </Label>
    </TouchableContainer>
  );
};

export default TabButton;
