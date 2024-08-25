import React from "react";
import {
  Text as RNText,
  TextProps,
  TextInput as RNTextInput,
  TextInputProps,
} from "react-native";

export const Text: React.FC<TextProps> = ({ style, ...props }) => {
  return (
    <RNText style={[{ fontFamily: "PTSans_400Regular" }, style]} {...props} />
  );
};

export const TextInput: React.FC<TextInputProps> = ({ style, ...props }) => {
  return (
    <RNTextInput
      style={[{ fontFamily: "PTSans_400Regular" }, style]}
      {...props}
    />
  );
};
