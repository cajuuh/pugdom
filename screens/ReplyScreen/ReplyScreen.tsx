import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import PugButton from "../../components/Button/Button";
import { PugTextInput } from "../../components/Text/Text";
import { useTheme } from "../../hooks/useTheme";


const ReplyScreen: React.FC = () => {
  const theme = useTheme();
  const { height: windowHeight } = Dimensions.get('window');

  return (
    <View style={[styles.container, { backgroundColor: theme.replyDrawerBackgroundColor }]}>
      <View style={[styles.drawerContent, { backgroundColor: theme.replyDrawerBackgroundColor, height: windowHeight * 0.9 }]}>
        <PugTextInput placeholder="Your thoughts?" />
        <PugButton title="Post" onPress={() => console.log("Post submitted")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  drawerContent: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
  },
});

export default ReplyScreen;
