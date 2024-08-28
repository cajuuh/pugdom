import styled from "styled-components/native";
import PugLayout from "../../../components/Layout/Layout";
import { PugTextInput } from "../../../components/Text/Text";

export const Container = styled(PugLayout)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const StyledInput = styled(PugTextInput)`
  margin-bottom: 16px;
  width: 100%;
`;
