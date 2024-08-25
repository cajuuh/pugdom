import React from "react";
import {
  CardContainer,
  ProfileImage,
  ContentContainer,
  MediaImage,
  ReblogContainer,
  ReblogText,
  SourceProfileImage,
  SourceUsername,
  UserInfo,
  Username,
  Server,
  UserNameContainer,
  SourceContainer,
  SourceUserContainer,
  ProfileImageContainer,
  SourceProfileImageContainer,
} from "./styles/TootCard.style";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import HTMLView from "react-native-htmlview";
import { FeedItem, MediaAttachment } from "../../screens/types";
import { formatServerUrl } from "../../utils/utils";
import CustomIcon from "../../utils/Icons";
import Colors from "../../constants/Colors";
import StatusActionBar from "../StatusActionBar/StatusActionBar";
import { Text } from "../../components/Text/Text";
import {
  useFonts,
  PTSans_400Regular,
  PTSans_700Bold,
} from "@expo-google-fonts/pt-sans";

type TootCardProps = {
  content: string;
  profileImageUrl: string;
  mediaAttachments: MediaAttachment[];
  username: string;
  serverUrl: string;
  reblog?: FeedItem;
  statusId: string;
};

const TootCard: React.FC<TootCardProps> = ({
  content = "",
  profileImageUrl = "",
  mediaAttachments = [],
  username,
  serverUrl,
  reblog,
  statusId,
}) => {
  const [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderCardContent = () => {
    if (reblog) {
      return (
        <ReblogContainer>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <SourceContainer>
              <SourceUserContainer>
                <CustomIcon
                  name="ArrowPathIcon"
                  color={Colors.green}
                  size={20}
                />
                <ReblogText>Boosted from </ReblogText>
                <SourceProfileImageContainer>
                  <SourceProfileImage source={{ uri: reblog.account.avatar }} />
                </SourceProfileImageContainer>
                <SourceUsername>{reblog.account.username}</SourceUsername>
              </SourceUserContainer>
            </SourceContainer>
          </View>
          <HTMLView value={reblog.content} stylesheet={htmlStyles} />
          {reblog.media_attachments.map((media) => (
            <MediaImage key={media.id} source={{ uri: media.url }} />
          ))}
        </ReblogContainer>
      );
    } else {
      return (
        <>
          <HTMLView value={content} stylesheet={htmlStyles} />
          {mediaAttachments.map((media) => (
            <MediaImage key={media.id} source={{ uri: media.url }} />
          ))}
        </>
      );
    }
  };

  if (!content && !reblog) {
    return <Text>No Toots Found!</Text>;
  }

  return (
    <CardContainer>
      <UserInfo>
        <ProfileImageContainer>
          <ProfileImage source={{ uri: profileImageUrl }} />
        </ProfileImageContainer>
        <UserNameContainer>
          <Username style={styles.username}>{username}</Username>
          <Server style={styles.server}>
            {"@" + formatServerUrl(serverUrl)}
          </Server>
        </UserNameContainer>
      </UserInfo>
      <ContentContainer>{renderCardContent()}</ContentContainer>
      <StatusActionBar statusId={statusId} />
    </CardContainer>
  );
};

// Styles for the HTML content
const htmlStyles = StyleSheet.create({
  p: {
    fontFamily: "PTSans_400Regular",
    fontSize: 16,
    color: "#000",
  },
  h1: {
    fontFamily: "PTSans_700Bold",
    fontSize: 24,
  },
});

// General styles
const styles = StyleSheet.create({
  username: {
    fontFamily: "PTSans_700Bold",
  },
  server: {
    fontFamily: "PTSans_400Regular",
  },
});

export default TootCard;
