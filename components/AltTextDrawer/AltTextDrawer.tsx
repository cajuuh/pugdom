import BottomSheet from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Dimensions, Image, StyleSheet, TextInput, View } from "react-native";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../hooks/useTheme";
import { PugText } from "../Text/Text";
import { AltTextDrawerProps } from "../interfaces";
import PugButton from "../Button/Button";

const AltTextDrawer = forwardRef<any, AltTextDrawerProps>(
  ({ image, onSave }, ref) => {
    const sheetRef = useRef<BottomSheet>(null);
    const inputRef = useRef<TextInput>(null);
    const theme = useTheme();
    const { instanceInfo } = useAppContext();
    const [altText, setAltText] = useState(image.altText || "");
    const { height: windowHeight } = Dimensions.get("window");

    const descriptionLimit = 1500;

    useImperativeHandle(ref, () => ({
      openSheet() {
        sheetRef.current?.expand();
        setTimeout(() => {
          inputRef.current?.focus();
        }, 300);
      },
      closeSheet() {
        sheetRef.current?.close();
      },
    }));

    const handleSave = () => {
      onSave(altText);
      sheetRef.current?.close();
    };

    return (
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={[windowHeight * 0.9, windowHeight * 0.9]}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: theme.replyDrawerBackgroundColor }}
      >
        <View style={styles.container}>
          <Image source={{ uri: image.uri }} style={styles.imagePreview} />
          <TextInput
            ref={inputRef}
            placeholder="Describe the image..."
            placeholderTextColor={theme.placeholderTextColor}
            style={[styles.input, { color: theme.textColor }]}
            value={altText}
            onChangeText={setAltText}
            maxLength={descriptionLimit}
          />
          <PugText style={[styles.charCount, { color: theme.textColor }]}>
            {altText.length} / {descriptionLimit}
          </PugText>
          <PugButton
            title="Save"
            onPress={handleSave}
            style={[
              styles.saveButton,
              { backgroundColor: theme.activeButtonColor },
            ]}
          />
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "transparent",
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
  charCount: {
    textAlign: "right",
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 16,
  },
});

export default AltTextDrawer;
