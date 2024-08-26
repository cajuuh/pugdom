import styled from "styled-components/native";
import * as Animatable from "react-native-animatable";
import { Text } from "@ui-kitten/components";
import Colors from "../../../constants/Colors";

export const TouchableContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AnimatedContainer = styled(Animatable.View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled.View<{ focused: boolean }>`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  padding: 0;
`;

export const AnimatedCircle = styled(Animatable.View)<{ focused: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  position: absolute;
  top: 3px;
  left: 3px;
`;

export const Label = styled(Text)<{ focused: boolean }>`
  color: ${({ focused }) => (focused ? Colors.primary : Colors.primaryLite)};
`;
