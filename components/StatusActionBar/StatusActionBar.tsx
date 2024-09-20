import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useMastodonAPI } from "../../hooks/useMastodonAPI";
import CustomIcon from "../../utils/Icons";
import { StatusActionBarProps } from "../interfaces";
import { PugText } from "../Text/Text";

const StatusActionBar: React.FC<StatusActionBarProps> = ({
  statusId,
  onReplyPress,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isReblogged, setIsReblogged] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { favoriteStatus, reblogStatus, bookmarkStatus, loading, error } =
    useMastodonAPI();

  useEffect(() => {
    if (error) {
      console.log("Error:", error);
    }
  }, [error]);

  const handleFavorite = async () => {
    console.log("Handling favorite status...");
    const result = await favoriteStatus(statusId, isFavorited);
    console.log("Favorite result:", result);
    if (result) setIsFavorited(!isFavorited);
  };

  const handleReblog = async () => {
    console.log("Handling reblog status...");
    const result = await reblogStatus(statusId, isReblogged);
    console.log("Reblog result:", result);
    if (result) setIsReblogged(!isReblogged);
  };

  const handleBookmark = async () => {
    console.log("Handling bookmark status...");
    const result = await bookmarkStatus(statusId, isBookmarked);
    console.log("Bookmark result:", result);
    if (result) setIsBookmarked(!isBookmarked);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => onReplyPress(statusId)}
            style={styles.icon}
          >
            <CustomIcon
              name="ChatBubbleOvalLeftIcon"
              size={22}
              color={"#aaa"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFavorite} style={styles.icon}>
            <CustomIcon
              name="HeartIcon"
              solid={isFavorited}
              size={22}
              color={isFavorited ? "#E0245E" : "#aaa"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReblog} style={styles.icon}>
            <CustomIcon
              name="ArrowPathIcon"
              solid={isReblogged}
              size={22}
              color={isReblogged ? "#1DA1F2" : "#aaa"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmark}>
            <CustomIcon
              name="BookmarkIcon"
              solid={isBookmarked}
              size={22}
              color={isBookmarked ? "#1DA1F2" : "#aaa"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => console.log("More options pressed")}>
          <CustomIcon name="EllipsisHorizontalIcon" size={22} color="#aaa" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  icon: {
    marginRight: 15,
  },
});

export default StatusActionBar;
