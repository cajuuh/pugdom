import styled from "styled-components/native";
import { ThemeType } from "@ui-kitten/components";

type ThemeProps = {
  theme: ThemeType;
};

const Container = styled.View<ThemeProps>`
  flex: 1;
  padding: 16px;
  background-color: ${(props) => props.theme["background-basic-color-1"]};
`;

const WelcomeText = styled.Text<ThemeProps>`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => props.theme["text-basic-color"]};
`;

const FeedItemContainer = styled.View<ThemeProps>`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme["border-basic-color-3"]};
`;

const FeedText = styled.Text<ThemeProps>`
  font-size: 16px;
  color: ${(props) => props.theme["text-basic-color"]};
`;

export { Container, WelcomeText, FeedItemContainer, FeedText };
