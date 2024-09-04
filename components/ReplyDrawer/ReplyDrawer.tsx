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
  TouchableOpacity,
} from "react-native";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../hooks/useTheme";
import CustomHandler from "./components/CustomHandler";
import ActionBar from "./components/ActionBar";
import CustomIcon from "../../utils/Icons";
import { ReplyDrawerProps, SelectedImage } from "../interfaces";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import AltTextDrawer from "../AltTextDrawer/AltTextDrawer";
import { PugText } from "../Text/Text";
import Colors from "../../constants/Colors";
import { uploadMedia } from "../../services/mediaService";
import { useStatusService } from "../../services/statusService";

const ReplyDrawer = forwardRef<any, ReplyDrawerProps>(({ statusId }, ref) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const sheetRef = useRef<BottomSheet>(null);
  const altTextDrawerRef = useRef<any>(null);
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme();
  const { height: windowHeight } = Dimensions.get("window");
  const { showTabNavigation, hideTabNavigation, appParams } = useAppContext();
  const { createStatus, replyToStatus } = useStatusService();

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
    Keyboard.dismiss();
    setCurrentIndex(index);
    setTimeout(() => {
      altTextDrawerRef.current?.openSheet();
    }, 150);
  };

  const saveAltText = (altText: string) => {
    if (currentIndex !== null) {
      setSelectedImages((prevImages) =>
        prevImages.map((image, i) =>
          i === currentIndex ? { ...image, altText } : image
        )
      );
      setCurrentIndex(null);
    }
  };

  useImperativeHandle(ref, () => ({
    openSheet() {
      sheetRef.current?.expand();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    },
    closeSheet() {
      sheetRef.current?.close();
      setTimeout(() => {
        Keyboard.dismiss();
      }, 100);
    },
  }));

  const handleClose = () => {
    sheetRef.current?.close();
    setTimeout(() => {
      Keyboard.dismiss();
    }, 200);
  };

  const uploadImages = async (): Promise<string[]> => {
    const mediaIds: string[] = [];

    for (const image of selectedImages) {
      try {
        const mediaId = await uploadMedia(image.uri, image.altText);
        mediaIds.push(mediaId);
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }

    return mediaIds;
  };

  const handlePost = async () => {
    try {
      const mediaIds = selectedImages
        .map((image) => image.id)
        .filter((id): id is string => id !== undefined);
      if (statusId) {
        await replyToStatus({
          statusId,
          statusText,
          mediaIds,
        });
      } else {
        await createStatus({
          statusText,
          mediaIds,
        });
      }
      console.log("Post submitted successfully");

      setStatusText("");

      if (sheetRef.current) {
        sheetRef.current.close();
      }
    } catch (error) {
      console.error("Failed to post:", error);
    } finally {
      setTimeout(() => {
        Keyboard.dismiss();
      }, 200);
    }
  };

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={[windowHeight * 0.97, windowHeight * 0.97]}
        enablePanDownToClose={true}
        enableHandlePanningGesture={false}
        enableOverDrag={true}
        overDragResistanceFactor={0.8}
        backgroundStyle={{
          backgroundColor: theme.replyDrawerBackgroundColor,
        }}
        footerComponent={() => (
          <ActionBar
            onImageSelect={handleImageSelect}
            selectedImages={selectedImages}
          />
        )}
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
              value={statusText}
              onChangeText={setStatusText}
            />
          </View>
          {selectedImages.length > 0 && (
            <View style={{ height: 250 }}>
              <BottomSheetFlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={selectedImages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item: image, index }) => (
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
                      <TouchableOpacity
                        onPress={() => handleRemoveImage(index)}
                      >
                        <CustomIcon
                          name="TrashIcon"
                          solid={true}
                          size={24}
                          color={theme.textColor}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleAddAltText(index)}>
                        <View style={styles.altTextContainer}>
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
                )}
              />
            </View>
          )}
        </View>
      </BottomSheet>
      {currentIndex !== null && (
        <AltTextDrawer
          ref={altTextDrawerRef}
          image={selectedImages[currentIndex]}
          onSave={saveAltText}
        />
      )}
    </>
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
    marginBottom: "30%",
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
    fontSize: 16,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  exclamationIcon: {
    position: "absolute",
    top: "3%",
    left: "2%",
    borderRadius: 12,
    overflow: "hidden", // iOS specific fix
  },
  imageActions: {
    width: "100%",
    position: "absolute",
    bottom: "20%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  altTextContainer: {
    top: "10%",
    right: "10%",
  },
});

export default ReplyDrawer;
