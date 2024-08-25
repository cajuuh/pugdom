import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CustomIcon from "../../utils/Icons";
import { useMastodonAPI } from "../../hooks/useMastodonAPI";
import { StatusActionBarProps } from "../../components/interfaces";

const StatusActionBar: React.FC<StatusActionBarProps> = ({ statusId }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isReblogged, setIsReblogged] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { favoriteStatus, reblogStatus, bookmarkStatus } = useMastodonAPI();

  const handleFavorite = async () => {
    const result = await favoriteStatus(statusId, isFavorited);
    if (result) setIsFavorited(!isFavorited);
  };

  const handleReblog = async () => {
    const result = await reblogStatus(statusId, isReblogged);
    if (result) setIsReblogged(!isReblogged);
  };

  const handleBookmark = async () => {
    const result = await bookmarkStatus(statusId, isBookmarked);
    if (result) setIsBookmarked(!isBookmarked);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleFavorite}>
            <CustomIcon
              name="HeartIcon"
              solid={isFavorited}
              size={22}
              color={isFavorited ? "#E0245E" : "#aaa"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReblog}>
            <CustomIcon
              name={isReblogged ? "ArrowPathIcon" : "ArrowPathIcon"}
              solid={isReblogged}
              size={22}
              color={isReblogged ? "#1DA1F2" : "#aaa"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmark}>
            <CustomIcon
              name={isBookmarked ? "BookmarkIcon" : "BookmarkIcon"}
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
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
});

export default StatusActionBar;
