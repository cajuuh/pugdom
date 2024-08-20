// src/components/Banner.tsx

import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

export interface BannerRef {
  showBanner: () => void;
  hideBanner: () => void;
}

interface BannerProps {
  onRefresh: () => void;
}

const Banner: React.ForwardRefRenderFunction<BannerRef, BannerProps> = (
  { onRefresh },
  ref
) => {
  const [visible, setVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    showBanner: () => setVisible(true),
    hideBanner: () => setVisible(false),
  }));

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, animation]);

  return (
    visible && (
      <Animated.View
        style={[
          styles.banner,
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.bannerText}>New content available</Text>
        <TouchableOpacity onPress={onRefresh}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text style={styles.dismissText}>Dismiss</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#4caf50",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000, // Ensures it's always above other components
  },
  bannerText: {
    color: "#fff",
    flex: 1,
  },
  refreshText: {
    color: "#fff",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  dismissText: {
    color: "#fff",
    marginHorizontal: 10,
  },
});

export default forwardRef(Banner);
