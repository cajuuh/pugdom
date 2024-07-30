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
  border-width: 1px;
  border-radius: 25px;
  padding: 5px;
  border-color: ${({ focused }) =>
    focused ? Colors.primary : Colors.primaryLite};
  background-color: ${({ focused }) =>
    focused ? Colors.primary : "transparent"};
`;

export const AnimatedCircle = styled(Animatable.View)<{ focused: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ focused }) =>
    focused ? Colors.primaryLite : "transparent"};
  position: absolute;
`;

export const Label = styled(Text)<{ focused: boolean }>`
  color: ${({ focused }) => (focused ? Colors.primary : Colors.primaryLite)};
`;
