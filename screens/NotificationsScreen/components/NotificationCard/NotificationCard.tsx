import React from "react";
import { FlatList, Image, StyleSheet, View, Text } from "react-native";
import HTMLView from "react-native-htmlview";
import { PugText } from "../../../../components/Text/Text";
import {
  NotificationCardProps,
  ThemeType,
} from "../../../../components/interfaces";
import { useTheme } from "../../../../hooks/useTheme";
import CustomIcon from "../../../../utils/Icons";
import { getTimeDifference } from "../../../../utils/utils";
import EmojiRenderer from "../../../../components/EmojiRenderer/EmojiRenderer";

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  body,
  date,
  avatar,
  username,
  mediaAttachments = [],
  poll,
  customEmojis = [],
}) => {
  const timeDifference = getTimeDifference(date);

  const theme = useTheme();

  const renderIcon = () => {
    switch (title) {
      case "follow":
        return (
          <CustomIcon
            name="UserPlusIcon"
            size={20}
            color={theme.notificationsIcon}
          />
        );
      case "favourite":
        return (
          <CustomIcon
            name="HeartIcon"
            size={20}
            color={theme.notificationsIcon}
          />
        );
      case "reblog":
        return (
          <CustomIcon
            name="ArrowPathIcon"
            size={20}
            color={theme.notificationsIcon}
          />
        );
      case "mention":
        return (
          <CustomIcon
            name="AtSymbolIcon"
            size={20}
            color={theme.notificationsIcon}
          />
        );
      case "poll": // Add case for "Polls"
        return (
          <CustomIcon
            name="ChartBarIcon"
            solid={true}
            size={20}
            color={theme.notificationsIcon}
          />
        );
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

  const renderPoll = () => {
    if (!poll) return null;

    return (
      <View
        style={[styles.pollContainer, { borderColor: theme.secondaryColor }]}
      >
        {poll.options.map((option, index) => (
          <View key={index} style={styles.pollOption}>
            <PugText style={{ color: theme.textColor }}>{option.title}</PugText>
            <PugText
              style={{ color: theme.textColor }}
            >{`${option.votes_count} votes`}</PugText>
          </View>
        ))}
        <PugText
          style={{ color: theme.textColor }}
        >{`Total Votes: ${poll.votes_count}`}</PugText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{renderIcon()}</View>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.secondaryColor,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.userContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <View style={styles.userNameAndDateContainer}>
              <PugText style={[styles.username, { color: theme.textColor }]}>
                {username}
              </PugText>
              <PugText style={[styles.date, { color: theme.secondaryColor }]}>
                {typeof timeDifference === "number"
                  ? `${timeDifference} hours ago`
                  : timeDifference}
              </PugText>
            </View>
          </View>
          <View style={styles.body}>
            <EmojiRenderer
              content={body}
              emojis={customEmojis}
              stylesheet={htmlStyles(theme)}
            />
          </View>
          {renderMediaAttachments()}
          {renderPoll()}
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
    padding: 12,
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
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
    fontFamily: "PTSans_700Bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "PTSans_400Regular",
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
  pollContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  pollOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

// Update the htmlStyles to be theme-aware
const htmlStyles = (theme: ThemeType) =>
  StyleSheet.create({
    p: {
      fontFamily: "PTSans_400Regular",
      fontSize: 16,
      color: theme.textColor, // Use theme text color
      flexWrap: "wrap",
    },
    h1: {
      fontFamily: "PTSans_700Bold",
      fontSize: 24,
      color: theme.textColor, // Use theme text color
    },
    a: {
      color: theme.primaryColor,
      textDecorationLine: "underline",
    },
  });

export default NotificationCard;
