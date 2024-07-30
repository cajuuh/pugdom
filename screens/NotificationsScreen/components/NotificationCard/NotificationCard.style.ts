import styled from "styled-components/native";

export const Card = styled.View`
  background-color: #fff;
  padding: 16px;
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: flex-start;
  border-style: solid;
  border-width: 2px;
  border-color: #e6e6e6;
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
  width: 150px;
`;

export const Date = styled.Text`
  margin-top: 5px;
  color: #888;
`;

export const Username = styled.Text`
  font-weight: bold;
  margin-top: 5px;
  color: #888;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  gap: 5px;
`;

export const UserNameAndDateContainer = styled.View`
  flex-direction: column;
`;
