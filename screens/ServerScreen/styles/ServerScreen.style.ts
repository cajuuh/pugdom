import styled from "styled-components/native";
import PugLayout from "../../../components/Layout/Layout";
import { PugTextInput } from "../../../components/Text/Text";

// Add a logo image with good size and margin
export const LogoImage = styled.Image`
  width: 120px;
  height: 120px;
  margin-bottom: 24px;
  border-radius: 24px;
  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: 0px 2px 8px ${(props) => props.theme.shadowColor};
`;

// Container remains the same, but you could add a subtle background if you want
export const Container = styled(PugLayout)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: #f7f8fa;
`;

// Enhanced input styling
export const StyledInput = styled(PugTextInput)`
  margin-bottom: 18px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0px 2px 8px #0001;
  border-width: 1px;
  border-color: ${(props) => props.theme.borderColor};
  font-size: 16px;
`;
