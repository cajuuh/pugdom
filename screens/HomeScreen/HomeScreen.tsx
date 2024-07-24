import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Container, WelcomeText } from "./styles/HomeScreen.style";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ route }) => {
  const { username } = route?.params;

  return (
    <Container>
      <WelcomeText>Welcome, {username}!</WelcomeText>
    </Container>
  );
};

export default HomeScreen;
