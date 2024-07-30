import styled from "styled-components/native";
import { useTheme } from "@ui-kitten/components";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${(props) => props.theme["background-basic-color-1"]};
`;

const WelcomeText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => props.theme["text-basic-color"]};
`;

const FeedItemContainer = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme["border-basic-color-3"]};
`;

const FeedText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme["text-basic-color"]};
`;

export { Container, WelcomeText, FeedItemContainer, FeedText };
