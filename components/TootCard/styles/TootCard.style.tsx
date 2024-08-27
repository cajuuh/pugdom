import { Image as ExpoImage } from 'expo-image';
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");

export const CardContainer = styled.View`
  padding: 16px;
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: flex-start;
  border-bottom-width: 2px;
  border-bottom-color: #e6e6e6;
`;

export const ProfileImageContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 16px;
  overflow: hidden;
`;

export const ProfileImage = styled(ExpoImage).attrs(() => ({
  onError: (error: any) => {
    console.error('Image load error:', error);
  },
}))`
  width: 40px;
  height: 40px;
  border-radius: 20px;
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

export const ContentContainer = styled.View``;

export const MediaImage = styled(ExpoImage)`
  width: ${width - 90}px;
  height: 200px;
  margin-top: 10px;
  border-radius: 8px;
  content-fit: cover;
  cache-policy: memory-disk;
`;

export const ReblogContainer = styled.View`
  padding: 10px;
  border-radius: 10px;
  width: ${width - 70}px;
`;

export const ReblogText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
  font-family: "PTSans_700Bold";
`;

export const SourceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const SourceUserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
  padding-vertical: 5px;
  padding-horizontal: 5px;
  border-radius: 25px;
  background-color: #e6e9f2;
`;

export const SourceProfileImageContainer = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 25px;
  margin-left: 5px;
  overflow: hidden;
`;

export const SourceProfileImage = styled(ExpoImage)`
  width: 20px;
  height: 20px;
  border-radius: 25px;
  cache-policy: memory-disk;
`;

export const SourceUsername = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
`;
