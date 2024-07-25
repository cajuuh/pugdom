import styled from "styled-components/native";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const CardContainer = styled.View`
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

export const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 16px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const UserNameContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const Username = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
`;

export const Server = styled.Text`
  font-size: 14px;
  color: gray;
`;

export const ContentContainer = styled.View`
  flex: 1;
`;

export const MediaImage = styled.Image`
  width: 100%;
  height: 200px;
  margin-top: 10px;
  border-radius: 8px;
  resize-mode: cover;
`;

export const ReblogContainer = styled.View`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  width: ${width - 70};
`;

export const ReblogText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const SourceProfileImage = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 5px;
  margin-left: 5px;
  margin-bottom: 5px;
`;

export const SourceUsername = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;
