import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import HTMLView from "react-native-htmlview";
import { NotificationCardProps } from "../../../../components/interfaces";
import { getTimeDifference } from "../../../../utils/utils";
import CustomIcon from "../../../../utils/Icons";

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  body,
  date,
  avatar,
  username,
  mediaAttachments = [],
}) => {
  const timeDifference = getTimeDifference(date);

  const renderIcon = () => {
    switch (title) {
      case "follow":
        return <CustomIcon name="UserPlusIcon" size={20} color="#2D9EE0" />;
      case "favourite":
        return <CustomIcon name="HeartIcon" size={20} color="#2D9EE0" />;
      case "reblog":
        return <CustomIcon name="ArrowPathIcon" size={20} color="#2D9EE0" />;
      case "mention":
        return <CustomIcon name="AtSymbolIcon" size={20} color="#2D9EE0" />;
      default:
        return null;
    }
  };

  const renderMediaAttachments = () => {
    if (mediaAttachments.length > 0) {
      return (
        <FlatList
          horizontal
          data={mediaAttachments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.mediaImage} />
          )}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{renderIcon()}</View>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.userContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <View style={styles.userNameAndDateContainer}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.date}>
                {typeof timeDifference === "number"
                  ? `${timeDifference} hours ago`
                  : timeDifference}
              </Text>
            </View>
          </View>
          <View style={styles.body}>
            <HTMLView value={body} stylesheet={htmlStyles} />
          </View>
          {renderMediaAttachments()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  userNameAndDateContainer: {
    marginLeft: 8,
  },
  username: {
    fontWeight: "bold",
  },
  date: {
    color: "#888",
    marginTop: 3,
    fontSize: 12,
  },
  body: {
    marginTop: 5,
    maxWidth: "95%",
  },
  mediaImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    color: "#000",
    flexWrap: "wrap",
  },
});

export default NotificationCard;
