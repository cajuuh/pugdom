import React from "react";
import { Text as RNText, TextInput as RNTextInput, TextInputProps, TextProps } from "react-native";

export const PugText: React.FC<TextProps> = ({ style = {}, ...props }) => {
  return (
    <RNText style={[{ fontFamily: "PTSans_400Regular" }, style]} {...props} />
  );
};

export const PugTextInput: React.FC<TextInputProps> = ({ style = {}, ...props }) => {
  return (
    <RNTextInput
      style={[{ fontFamily: "PTSans_400Regular" }, style]}
      {...props}
    />
  );
};
