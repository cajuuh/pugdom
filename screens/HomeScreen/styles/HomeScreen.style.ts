import styled from "styled-components/native";
import { ThemeProps } from "../../types";

const Container = styled.View<ThemeProps>`
  flex: 1;
  padding: 16px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const WelcomeText = styled.Text<ThemeProps>`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => props.theme.textColor};
`;

const FeedItemContainer = styled.View<ThemeProps>`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.secondaryColor};
`;

const FeedText = styled.Text<ThemeProps>`
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
`;

export { Container, FeedItemContainer, FeedText, WelcomeText };
