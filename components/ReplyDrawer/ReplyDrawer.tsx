/**
 * ReplyDrawer Component
 *
 * This component is designed to allow users to compose and reply to posts in a Mastodon-like social platform.
 * It provides the functionality to:
 * - Add text input for the post/reply.
 * - Attach and manage images, including the ability to add alt text to images.
 * - Create and manage polls with customizable options and duration.
 * - Post the reply or new status to the Mastodon API via provided service functions.
 *
 * @param {ReplyDrawerProps} props - The props for the component.
 * @param {string} props.statusId - (optional) The ID of the status to reply to. If provided, the post is treated as a reply.
 * @param {React.Ref<any>} ref - The reference to control opening and closing of the bottom sheet externally.
 * @returns {JSX.Element} The rendered ReplyDrawer component.
 *
 * Example Usage:
 * ```tsx
 * const replyDrawerRef = useRef(null);
 *
 * // To open the reply drawer
 * replyDrawerRef.current?.openSheet();
 *
 * // To close the reply drawer
 * replyDrawerRef.current?.closeSheet();
 * ```
 */

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

// The main component for handling replies and post creation
const ReplyDrawer = forwardRef<any, ReplyDrawerProps>(({ statusId }, ref) => {
  // Local state for managing the reply text, selected images, and poll data
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

  // Refs to control bottom sheet and text input behaviors
  const sheetRef = useRef<BottomSheet>(null);
  const altTextDrawerRef = useRef<any>(null);
  const inputRef = useRef<TextInput>(null);

  // Theme and app context hooks for customization and app data
  const theme = useTheme();
  const { height: windowHeight } = Dimensions.get("window");
  const { appParams, instanceInfo } = useAppContext();
  const { createStatus, replyToStatus } = useStatusService();

  // Get limits for poll options and character counts from instance info
  const maxOptions = instanceInfo?.polls?.max_options || 4;
  const maxCharactersPerOption =
    instanceInfo?.polls?.max_characters_per_option || 255;

  // Placeholder messages for the text input, randomly selected
  const placeholderMessages = [
    "Ready to Toot? 🐘",
    "What's on your mind? ✍️",
    "What are you doing? ✨",
  ];

  const [placeholderMessage] = useState(
    placeholderMessages[Math.floor(Math.random() * placeholderMessages.length)]
  );

  // State for managing selected images
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  /**
   * Handle image selection and add the selected image to the reply.
   * @param {string} uri - The URI of the selected image.
   */
  const handleImageSelect = (uri: string) => {
    setSelectedImages((prevImages) => [...prevImages, { uri, altText: "" }]);
  };

  /**
   * Remove an image from the selected images.
   * @param {number} index - The index of the image to remove.
   */
  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  /**
   * Open the AltTextDrawer to allow users to add alt text to the selected image.
   * @param {number} index - The index of the image to add alt text to.
   */
  const handleAddAltText = (index: number) => {
    Keyboard.dismiss();
    setCurrentIndex(index);
    setTimeout(() => {
      altTextDrawerRef.current?.openSheet();
    }, 150);
  };

  /**
   * Save the alt text for the currently selected image.
   * @param {string} altText - The alt text to save.
   */
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

  /**
   * Imperative handle to open or close the bottom sheet from an external ref.
   */
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

  /**
   * Close the bottom sheet and dismiss the keyboard.
   */
  const handleClose = () => {
    sheetRef.current?.close();
    setTimeout(() => {
      Keyboard.dismiss();
    }, 200);
  };

  /**
   * Handles posting the reply or status. It includes the selected images or polls
   * and sends the data to the Mastodon API.
   */
  const handlePost = async () => {
    try {
      const mediaIds =
        pollData.options.length === 0
          ? selectedImages
              .map((image) => image.id)
              .filter((id): id is string => id !== undefined)
          : [];

      const payload: any = {
        status: statusText,
        media_ids: mediaIds,
        poll:
          pollData.options.length > 0
            ? {
                options: pollData.options,
                expires_in: pollData.duration,
                multiple: false,
                hide_totals: false,
              }
            : undefined,
      };

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

  /**
   * Updates the poll data whenever changes are made in the PollComponent.
   * @param {object} newPollData - The updated poll options and duration.
   */
  const handlePollDataChange = (newPollData: {
    options: string[];
    duration: number | undefined;
  }) => {
    setPollData(newPollData);
  };

  /**
   * Toggles the visibility of the poll component in the drawer.
   */
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
              <PollComponent
                onPollDataChange={handlePollDataChange} // Pass the handler to update poll data
              />
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
