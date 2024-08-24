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
    console.log(result);
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
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFavorite}>
        <CustomIcon
          name={isFavorited ? "Heart" : "Heart"} // Lucide uses the same icon for filled and outlined heart
          size={22}
          color={isFavorited ? "#E0245E" : "#aaa"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReblog}>
        <CustomIcon
          name={isReblogged ? "RefreshCw" : "RefreshCw"} // Lucide doesn't have a "rocket" icon, so using "RefreshCw"
          size={22}
          color={isReblogged ? "#1DA1F2" : "#aaa"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBookmark}>
        <CustomIcon
          name={isBookmarked ? "Bookmark" : "Bookmark"}
          size={22}
          color={isBookmarked ? "#1DA1F2" : "#aaa"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("More options pressed")}>
        <CustomIcon
          name="MoreHorizontal" // Lucide icon for "ellipsis-h"
          size={22}
          color="#aaa"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "5%",
  },
});

export default StatusActionBar;
