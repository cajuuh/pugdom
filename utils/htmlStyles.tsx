import { StyleSheet } from "react-native";
import { ThemeType } from "../components/interfaces";


const TootCardHtmlStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    p: {
      fontFamily: "PTSans_400Regular",
      fontSize: 16,
      color: theme?.textColor,
    },
    h1: {
      fontFamily: "PTSans_700Bold",
      fontSize: 24,
      color: theme?.textColor,
    },
    a: {
      color: theme.primaryColor,
      textDecorationLine: 'underline',
    },
    img: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
  });
};

export default TootCardHtmlStyles;
