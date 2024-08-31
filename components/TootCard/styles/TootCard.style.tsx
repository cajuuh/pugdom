import { Image as ExpoImage } from "expo-image";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { PugText } from "../../Text/Text";
import { ThemeType } from "../../interfaces";

const { width } = Dimensions.get("window");

type ThemeProps = {
  theme: ThemeType;
};

export const CardContainer = styled.View<ThemeProps>`
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: flex-start;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.theme.secondaryColor};
  background-color: ${(props) => props.theme.backgroundColor};
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
    console.error("Image load error:", error);
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

export const Username = styled(PugText)<ThemeProps>`
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
  color: ${(props) => props.theme.textColor};
`;

export const Server = styled.Text<ThemeProps>`
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
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

export const ReblogContainer = styled.View<ThemeProps>`
  padding: 10px;
  border-radius: 10px;
  width: ${width - 70}px;
`;

export const ReblogText = styled.Text<ThemeProps>`
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
  font-family: "PTSans_700Bold";
  color: ${(props) => props.theme.textColor};
`;

export const SourceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const SourceUserContainer = styled.View<ThemeProps>`
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
  padding-vertical: 7px;
  padding-horizontal: 12px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.reblogPillColor};
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

export const SourceUsername = styled.Text<ThemeProps>`
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
  color: ${(props) => props.theme.textColor};
`;
