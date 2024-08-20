import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import LottieView from "lottie-react-native";

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
          <LottieView
            source={require("../../assets/animations/arrow-up-update-circle.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text style={styles.text}>New posts</Text>
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#4caf50",
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
