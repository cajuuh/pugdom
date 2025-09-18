import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
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
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../hooks/useTheme";
import { useStatusService } from "../../services/statusService";
import CustomIcon from "../../utils/Icons";
import AltTextDrawer from "../AltTextDrawer/AltTextDrawer";
import { ReplyDrawerProps, SelectedImage } from "../interfaces";
import PollComponent from "../PollComponent/PollComponent";
import { PugText } from "../Text/Text";
import ActionBar from "./components/ActionBar";
import CustomHandler from "./components/CustomHandler";

const ReplyDrawer = forwardRef<any, ReplyDrawerProps>(({ statusId }, ref) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [showPoll, setShowPoll] = useState<boolean>(false);
  const [pollData, setPollData] = useState<{
    options: string[];
    duration: number | undefined;
  }>({
    options: [],
    duration: undefined,
  });

  const sheetRef = useRef<BottomSheet>(null);
  const altTextDrawerRef = useRef<any>(null);
  const inputRef = useRef<TextInput>(null);

  const theme = useTheme();
  const { height: windowHeight } = Dimensions.get("window");
  const { appParams, instanceInfo } = useAppContext();
  const { createStatus, replyToStatus } = useStatusService();

  const maxOptions = instanceInfo?.polls?.max_options || 4;
  const maxCharactersPerOption =
    instanceInfo?.polls?.max_characters_per_option || 255;

  const placeholderMessages = [
    "Ready to Toot? 🐘",
    "What's on your mind? ✍️",
    "What are you doing? ✨",
  ];
  const [placeholderMessage] = useState(
    placeholderMessages[Math.floor(Math.random() * placeholderMessages.length)],
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
      if (
        altTextDrawerRef.current &&
        typeof altTextDrawerRef.current.openSheet === "function"
      ) {
        altTextDrawerRef.current.openSheet();
      }
    }, 150);
  };

  const saveAltText = (altText: string) => {
    if (currentIndex !== null) {
      setSelectedImages((prevImages) =>
        prevImages.map((image, i) =>
          i === currentIndex ? { ...image, altText } : image,
        ),
      );
      setCurrentIndex(null);
    }
  };

  useImperativeHandle(ref, () => ({
    openSheet() {
      if (sheetRef.current && typeof sheetRef.current.expand === "function") {
        sheetRef.current.expand();
        setTimeout(() => {
          if (
            inputRef.current &&
            typeof inputRef.current.focus === "function"
          ) {
            inputRef.current.focus();
          }
        }, 300);
      }
    },
    closeSheet() {
      if (sheetRef.current && typeof sheetRef.current.close === "function") {
        sheetRef.current.close();
        setTimeout(() => {
          Keyboard.dismiss();
        }, 100);
      }
    },
  }));

  const handleClose = () => {
    if (sheetRef.current && typeof sheetRef.current.close === "function") {
      sheetRef.current.close();
      setTimeout(() => {
        Keyboard.dismiss();
      }, 200);
    }
  };

  const handlePost = async () => {
    try {
      if (!statusText.trim()) {
        throw new Error("Please enter some text before posting.");
      }

      const mediaIds = selectedImages.map((img) => img.id).filter((id) => !!id);

      const payload: any = {
        status: statusText,
      };

      if (!payload.inReplyToId) {
        throw new Error("inReplyToId must be set when replying to a status.");
      }

      if (mediaIds.length > 0) {
        payload.media_ids = mediaIds;
      }

      if (pollData.options.length > 0 && pollData.duration) {
        payload.poll = {
          options: pollData.options,
          expires_in: pollData.duration,
          multiple: false,
          hide_totals: false,
        };
      }

      console.log("Post payload:", payload);

      if (statusId) {
        await replyToStatus({
          ...payload,
          in_reply_to_id: statusId,
        });
      } else {
        await createStatus(payload);
      }

      console.log("Post submitted successfully");
      setStatusText("");
      if (sheetRef.current && typeof sheetRef.current.close === "function") {
        sheetRef.current.close();
      }
    } catch (error) {
      console.error("Request error details:", error?.response?.data);
      console.error("Failed to post:", error);
    } finally {
      setTimeout(() => {
        Keyboard.dismiss();
      }, 200);
    }
  };

  const handlePollDataChange = (newPollData: {
    options: string[];
    duration: number | undefined;
  }) => {
    setPollData(newPollData);
  };

  const togglePoll = () => {
    setShowPoll((prev) => !prev);
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
            openPoll={togglePoll}
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
            <View style={styles.textInput}>
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
            {showPoll && (
              <PollComponent onPollDataChange={handlePollDataChange} />
            )}
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

      {currentIndex !== null && selectedImages[currentIndex] && (
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
    flexDirection: "column",
    alignItems: "center",
  },
  textInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20%",
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
