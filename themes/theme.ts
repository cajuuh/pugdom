import { DefaultTheme } from "styled-components/native";
import { ThemeType } from "@ui-kitten/components";

const customTheme: ThemeType & DefaultTheme = {
  ...eva.light,
  ...eva.dark,
};

export default customTheme;
