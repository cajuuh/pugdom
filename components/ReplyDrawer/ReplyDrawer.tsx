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
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../hooks/useTheme";
import CustomHandler from "./components/CustomHandler";
import ActionBar from "./components/ActionBar";
import CustomIcon from "../../utils/Icons";
import { ReplyDrawerProps, SelectedImage } from "../interfaces";
import Colors from "../../constants/Colors";
import { PugText } from "../Text/Text";

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

  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  const handleImageSelect = (uri: string) => {
    setSelectedImages((prevImages) => [...prevImages, { uri, altText: "" }]);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleAddAltText = (index: number) => {
    Alert.prompt(
      "Add Alt Text",
      "Enter alt text for the image:",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (altText = "") => {
            setSelectedImages((prevImages) =>
              prevImages.map((image, i) =>
                i === index ? { ...image, altText: altText || "" } : image
              )
            );
          },
        },
      ],
      "plain-text"
    );
  };

  useImperativeHandle(ref, () => ({
    openSheet() {
      sheetRef.current?.expand();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    },
    closeSheet() {
      sheetRef.current?.close();
      setTimeout(() => {
        Keyboard.dismiss();
      }, 300);
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
    sheetRef.current?.close();
    setTimeout(() => {
      Keyboard.dismiss();
    }, 100);
  };

  const handlePost = () => {
    console.log("Post submitted");
    sheetRef.current?.close();
    setTimeout(() => {
      Keyboard.dismiss();
    }, 100);
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
      <ScrollView
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
        {selectedImages.length > 0 && (
          <View style={styles.imagePreviewContainer}>
            {selectedImages.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={{ uri: image.uri }}
                  style={styles.imagePreview}
                />
                {image.altText === "" && (
                  <CustomIcon
                    name="ExclamationCircleIcon"
                    size={24}
                    color={theme.attention}
                    style={[
                      styles.exclamationIcon,
                      { backgroundColor: "white" },
                    ]}
                  />
                )}
                <View
                  style={[
                    styles.imageActions,
                    { backgroundColor: theme.secondaryColor50opacity },
                  ]}
                >
                  <TouchableOpacity onPress={() => handleRemoveImage(index)}>
                    <CustomIcon
                      name="TrashIcon"
                      solid={true}
                      size={24}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleAddAltText(index)}>
                    <View style={styles.altTextContaier}>
                      <PugText
                        style={{
                          color: image.altText
                            ? Colors.green
                            : theme.noAltTextColor,
                        }}
                      >
                        ALT
                      </PugText>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <ActionBar
        onImageSelect={handleImageSelect}
        selectedImages={selectedImages}
      />
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
  imagePreviewContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  exclamationIcon: {
    position: "absolute",
    top: "3%",
    left: "2%",
    borderRadius: 12,
  },
  imageActions: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  altTextContaier: {
    top: "10%",
    right: "10%",
  },
});

export default ReplyDrawer;
