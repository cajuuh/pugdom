import BottomSheet from "@gorhom/bottom-sheet";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import PugButton from "../Button/Button";
import { PugTextInput } from "../Text/Text";

interface ReplyDrawerProps {
  statusId: string | null;
}

const ReplyDrawer = forwardRef<any, ReplyDrawerProps>(({ statusId }, ref) => {
  const sheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();
  const { height: windowHeight } = Dimensions.get('window');

  useImperativeHandle(ref, () => ({
    openSheet() {
      sheetRef.current?.expand();
    }
  }));

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[windowHeight - 95, "50%", "25%"]}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: theme.replyDrawerBackgroundColor }}
    >
      <View style={[styles.drawerContent, { backgroundColor: theme.replyDrawerBackgroundColor }]}>
        <PugTextInput
          placeholder="Your thoughts?"
        />
        <PugButton
          title="Post"
          onPress={() => console.log("Post submitted")}
        />
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  drawerContent: {
    padding: 16,
    height: '100%',
  },
});

export default ReplyDrawer;
