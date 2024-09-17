import styled from "styled-components/native";
import { ThemeProps } from "../types";
import { Image as ExpoImage } from "expo-image";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5%;
  padding-left: 1%;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const BackButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View<ThemeProps>`
  flex: 1;
  padding-top: 10%;
  padding-left: 3%;
  padding-right: 15%;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const DataContainer = styled.View<ThemeProps>`
  flex-direction: row;
`;

const MediaImage = styled(ExpoImage)`
  width: ${width - 90}px;
  height: 200px;
  margin-top: 10px;
  border-radius: 8px;
  content-fit: cover;
  cache-policy: memory-disk;
`;

const MediaContainer = styled.View`
  justify-content: center;
  align-content: center;
  left: 10%;
`;

const ProfileImageContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 16px;
  overflow: hidden;
`;

const ProfileImage = styled(ExpoImage).attrs(() => ({
  onError: (error: any) => {
    console.error("Image load error:", error);
  },
}))`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export {
  Container,
  MediaImage,
  ProfileImageContainer,
  ProfileImage,
  DataContainer,
  HeaderContainer,
  BackButtonContainer,
  MediaContainer,
};
