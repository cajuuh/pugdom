import BottomSheet from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../hooks/useTheme";
import PugButton from "../Button/Button";
import { PugText } from "../Text/Text"; // Assuming PugText is a styled text component
import CustomHandler from "./components/CustomHandler"; // Assuming CustomHandler is the custom handle component

interface ReplyDrawerProps {
  statusId: string | null;
}

const ReplyDrawer = forwardRef<any, ReplyDrawerProps>(({ statusId }, ref) => {
  const sheetRef = useRef<BottomSheet>(null);
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme();
  const { height: windowHeight } = Dimensions.get("window");
  const { showTabNavigation, hideTabNavigation, appParams } = useAppContext();

  useImperativeHandle(ref, () => ({
    openSheet() {
      sheetRef.current?.expand();
      setTimeout(() => {
        inputRef.current?.focus(); // Open keyboard when the drawer opens
      }, 300); // Slight delay to ensure the drawer is fully open
    },
    closeSheet() {
      Keyboard.dismiss(); // Dismiss the keyboard
      setTimeout(() => {
        sheetRef.current?.close();
      }, 100); // Delay closing the drawer slightly after the keyboard dismisses
    },
  }));

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        showTabNavigation();
      } else if (index === 0) {
        hideTabNavigation();
      }
    },
    [hideTabNavigation, showTabNavigation]
  );

  const handleClose = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
    setTimeout(() => {
      sheetRef.current?.close(); // Close the drawer after the keyboard is dismissed
    }, 100); // Delay to ensure the keyboard is fully dismissed before closing the drawer
  };

  const handlePost = () => {
    console.log("Post submitted");
    Keyboard.dismiss(); // Dismiss the keyboard
    setTimeout(() => {
      sheetRef.current?.close(); // Close the drawer after the keyboard is dismissed
    }, 100); // Delay to ensure the keyboard is fully dismissed before closing the drawer
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={[windowHeight * 0.5, windowHeight * 0.95]}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: theme.replyDrawerBackgroundColor }}
      handleComponent={() => (
        <CustomHandler handleClose={handleClose} handlePost={handlePost} />
      )}
    >
      <View
        style={[
          styles.drawerContent,
          { backgroundColor: theme.replyDrawerBackgroundColor },
        ]}
      >
        <View style={styles.body}>
          <Image
            source={{ uri: appParams.avatar || "default_avatar_url" }}
            style={styles.profileImage}
          />
          <TextInput
            ref={inputRef}
            placeholder="Your thoughts?"
            placeholderTextColor={theme.placeholderTextColor}
            style={[styles.input, { color: theme.textColor }]}
          />
        </View>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  drawerContent: {
    paddingHorizontal: 16,
    flex: 1,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "transparent",
    borderWidth: 1,
    padding: 8,
  },
});

export default ReplyDrawer;
