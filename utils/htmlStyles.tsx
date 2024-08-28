import { StyleSheet } from "react-native";
import { ThemeType } from "../components/interfaces";


const TootCardHtmlStyles = (theme: ThemeType) => {
  return StyleSheet.create({
    p: {
      fontFamily: "PTSans_400Regular",
      fontSize: 16,
      color: theme?.textColor, // Use theme's text color
    },
    h1: {
      fontFamily: "PTSans_700Bold",
      fontSize: 24,
      color: theme?.textColor,
    },
    a: {
      color: theme.primaryColor, // Use theme's primary color for links
      textDecorationLine: 'underline', // Optional: underline the links
    },
    img: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
  });
};

export default TootCardHtmlStyles;
