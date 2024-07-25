import styled from "styled-components/native";

export const CardContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-direction: row;
  align-items: flex-start;
`;

export const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 16px;
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
  margin-right: 8px;
`;

export const SourceUsername = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;
