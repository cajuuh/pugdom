import BottomSheet from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useAppContext } from "../../context/AppContext";
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
  const { showTabNavigation, hideTabNavigation } = useAppContext();

  useImperativeHandle(ref, () => ({
    openSheet() {
      sheetRef.current?.expand();
    },
    closeSheet() {
      sheetRef.current?.close();
    }
  }));

  const handleSheetChanges = useCallback((index: number) => {
    console.log('This is the index', index);
    if (index === 1) {
      hideTabNavigation();
    } else if (index === -1) {
      showTabNavigation();
    }
  }, [hideTabNavigation, showTabNavigation]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={[windowHeight * 0.5, windowHeight * 0.99]}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: theme.replyDrawerBackgroundColor }}
    >
      <View style={styles.drawerContent}>
        <PugTextInput placeholder={"Your thoughts? " + statusId?.toString()} />
        <PugButton title="Post" onPress={() => console.log("Post submitted")} />
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  drawerContent: {
    padding: 16,
    flex: 1,
  },
});

export default ReplyDrawer;
