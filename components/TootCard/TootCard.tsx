import {
  PTSans_400Regular,
  PTSans_700Bold,
  useFonts,
} from "@expo-google-fonts/pt-sans";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import HTMLView from "react-native-htmlview";
import { PugText } from "../../components/Text/Text";
import Colors from "../../constants/Colors";
import { useTheme } from "../../hooks/useTheme";
import { FeedItem, MediaAttachment } from "../../screens/types";
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
  ReblogText,
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
  // Always call hooks at the top level
  const [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
  });

  const theme = useTheme();
  const htmlStyles = TootCardHtmlStyles(theme);

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
    return <PugText>No Toots Found!</PugText>;
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
