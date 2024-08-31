import BottomSheet from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../hooks/useTheme";
import CustomHandler from "./components/CustomHandler";
import ActionBar from "./components/ActionBar";

interface ReplyDrawerProps {
  statusId: string | null;
}

const ReplyDrawer = forwardRef<any, ReplyDrawerProps>(({ statusId }, ref) => {
  const sheetRef = useRef<BottomSheet>(null);
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme();
  const { height: windowHeight } = Dimensions.get("window");
  const { showTabNavigation, hideTabNavigation, appParams } = useAppContext();

  const placeholderMessages = [
    "Ready to Toot? 🐘",
    "What's on your mind? ✍️",
    "What are you doing? ✨",
  ];

  const [placeholderMessage] = useState(
    placeholderMessages[Math.floor(Math.random() * placeholderMessages.length)]
  );

  useImperativeHandle(ref, () => ({
    openSheet() {
      sheetRef.current?.expand();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    },
    closeSheet() {
      Keyboard.dismiss();
      sheetRef.current?.close();
    },
  }));

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        Keyboard.dismiss();
        showTabNavigation();
      } else if (index === 0) {
        hideTabNavigation();
      }
    },
    [hideTabNavigation, showTabNavigation]
  );

  const handleClose = () => {
    Keyboard.dismiss();
    sheetRef.current?.close();
  };

  const handlePost = () => {
    console.log("Post submitted");
    Keyboard.dismiss();
    sheetRef.current?.close();
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
            placeholder={placeholderMessage}
            placeholderTextColor={theme.placeholderTextColor}
            style={[styles.input, { color: theme.textColor }]}
          />
        </View>
      </View>
      <ActionBar />
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  drawerContent: {
    paddingTop: 10,
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
