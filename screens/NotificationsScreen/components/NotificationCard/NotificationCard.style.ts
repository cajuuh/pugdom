import styled from "styled-components/native";

export const Card = styled.View`
  flex-direction: row;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const Content = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text`
  font-weight: bold;
`;

export const Body = styled.Text`
  margin-top: 5px;
`;

export const Date = styled.Text`
  margin-top: 5px;
  color: #888;
`;

export const Username = styled.Text`
  margin-top: 5px;
  color: #888;
`;
