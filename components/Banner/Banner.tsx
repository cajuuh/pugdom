import LottieView from "lottie-react-native";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PugText } from "../Text/Text";

export interface BannerRef {
  showBanner: () => void;
  hideBanner: () => void;
}

const Banner = forwardRef<BannerRef, { onRefresh: () => void }>(
  ({ onRefresh }, ref) => {
    const [visible, setVisible] = useState(false);
    const position = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => ({
      showBanner: () => {
        setVisible(true);
        Animated.timing(position, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
      hideBanner: () => {
        Animated.timing(position, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setVisible(false));
      },
    }));

    if (!visible) return null;

    return (
      <Animated.View
        style={[
          styles.bannerContainer,
          {
            opacity: position,
            transform: [
              {
                translateY: position.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-30, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onRefresh} style={styles.button}>
          <LinearGradient
            colors={["#00F5A0", "#00D9F5"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}
          >
            <LottieView
              source={require("../../assets/animations/arrow-up-update-circle.json")}
              autoPlay
              loop
              style={styles.lottie}
            />
            <PugText style={styles.text}>New toots</PugText>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  bannerContainer: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    zIndex: 1000,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  lottie: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Banner;
