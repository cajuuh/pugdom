import { PTSans_400Regular, PTSans_700Bold } from "@expo-google-fonts/pt-sans";
import { useFonts } from "@expo-google-fonts/pt-sans/useFonts";
import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { PugText } from "../../components/Text/Text";
import Colors from "../../constants/Colors";
import { useTheme } from "../../hooks/useTheme";
import { RootStackParamList, TootCardProps } from "../../screens/types";
import CustomIcon from "../../utils/Icons";
import TootCardHtmlStyles from "../../utils/htmlStyles";
import { formatServerUrl } from "../../utils/utils";
import StatusActionBar from "../StatusActionBar/StatusActionBar";
import {
  CardContainer,
  ContentContainer,
  MediaImage,
  ProfileImage,
  ProfileImageContainer,
  ReblogContainer,
  Server,
  SourceContainer,
  SourceProfileImage,
  SourceProfileImageContainer,
  SourceUserContainer,
  SourceUsername,
  UserInfo,
  UserNameContainer,
  Username,
} from "./styles/TootCard.style";
import EmojiRenderer from "../EmojiRenderer/EmojiRenderer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type TootCardNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const TootCard: React.FC<TootCardProps> = ({
  content = "",
  profileImageUrl = "",
  media_attachments = [],
  username = "",
  serverUrl = "",
  reblog,
  statusId = "",
  customEmojis = [],
  onReplyPress,
  poll,
}) => {
  const theme = useTheme();
  const htmlStyles = TootCardHtmlStyles(theme);
  const navigation = useNavigation<TootCardNavigationProp>();

  const renderReblogPill = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <SourceContainer>
        <SourceUserContainer>
          <CustomIcon name="ArrowPathIcon" color={Colors.green} size={20} />
          <SourceProfileImageContainer>
            <SourceProfileImage source={{ uri: profileImageUrl }} />
          </SourceProfileImageContainer>
          <SourceUsername>{username}</SourceUsername>
        </SourceUserContainer>
      </SourceContainer>
    </View>
  );

  const renderCardContent = () => {
    const relevantEmojis = reblog ? reblog.emojis : customEmojis;

    if (reblog) {
      return (
        <ReblogContainer>
          <EmojiRenderer
            content={reblog.content}
            emojis={relevantEmojis}
            stylesheet={htmlStyles}
          />
          {reblog.media_attachments.map((media) => (
            <MediaImage key={media.id} source={{ uri: media.url }} />
          ))}
        </ReblogContainer>
      );
    } else {
      return (
        <>
          <EmojiRenderer
            content={content}
            emojis={relevantEmojis}
            stylesheet={htmlStyles}
          />
          {media_attachments.map((media) => (
            <MediaImage key={media.id} source={{ uri: media.url }} />
          ))}
        </>
      );
    }
  };

  const renderPoll = () => {
    if (!poll) return null;

    return (
      <View style={styles.pollContainer}>
        {poll.options.map((option, index) => (
          <View key={index} style={styles.pollOption}>
            <Text>{option.title}</Text>
            <Text>{`${option.votes_count} votes`}</Text>
          </View>
        ))}
        <Text>{`Total Votes: ${poll.votes_count}`}</Text>
      </View>
    );
  };

  if (!content && !reblog) {
    return <PugText>No Toots Found!</PugText>;
  }

  const handlePress = () => {
    navigation.navigate("TootScreen", {
      toot: {
        content,
        profileImageUrl,
        media_attachments,
        account: {
          username,
          avatar: profileImageUrl,
          url: serverUrl,
        },
        username,
        serverUrl,
        reblog,
        statusId,
        customEmojis,
        poll,
        in_reply_to_id: null,
        in_reply_to_account_id: null,
        createdAt: new Date().toISOString(),
        sensitive: false,
        spoilerText: "",
        visibility: "public",
        favouritesCount: 0,
        reblogsCount: 0,
        repliesCount: 0,
        accountId: "12345",
        url: undefined,
        emojis: customEmojis,
        mentions: [],
        tags: [],
        card: undefined,
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <CardContainer>
        {reblog && renderReblogPill()}
        <UserInfo>
          <ProfileImageContainer>
            {reblog ? (
              <ProfileImage source={{ uri: reblog?.account.avatar }} />
            ) : (
              <ProfileImage source={{ uri: profileImageUrl }} />
            )}
          </ProfileImageContainer>
          <UserNameContainer>
            {reblog ? (
              <Username style={styles.username}>
                {reblog?.account.username}
              </Username>
            ) : (
              <Username style={styles.username}>{username}</Username>
            )}
            <Server style={styles.server}>
              {"@" + formatServerUrl(serverUrl)}
            </Server>
          </UserNameContainer>
        </UserInfo>
        <ContentContainer>{renderCardContent()}</ContentContainer>
        {poll && renderPoll()}
        <StatusActionBar statusId={statusId} onReplyPress={onReplyPress} />
      </CardContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  username: {
    fontFamily: "PTSans_700Bold",
  },
  server: {
    fontFamily: "PTSans_400Regular",
  },
  pollContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
  },
  pollOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

export default TootCard;
