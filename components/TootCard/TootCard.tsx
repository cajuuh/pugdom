import {
  PTSans_400Regular,
  PTSans_700Bold,
  useFonts,
} from "@expo-google-fonts/pt-sans";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
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

type Emoji = {
  shortcode: string;
  url: string;
};

type TootCardProps = {
  content: string;
  profileImageUrl: string;
  mediaAttachments: MediaAttachment[];
  username: string;
  serverUrl: string;
  reblog?: FeedItem;
  statusId: string;
  customEmojis: Emoji[];
};

const TootCard: React.FC<TootCardProps> = ({
  content = "",
  profileImageUrl = "",
  mediaAttachments = [],
  username = "",
  serverUrl = "",
  reblog,
  statusId = "",
  customEmojis = [],
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

  const replaceEmojis = (text: string, emojis: Emoji[]) => {
    console.log("Available emojis:", emojis);
    console.log("Custom emojis:", customEmojis);

    return text.replace(/:([a-zA-Z0-9_]+):/g, (match, shortcode) => {
      console.log("Processing shortcode:", shortcode);

      const emoji = emojis.find((e) => e.shortcode === shortcode);

      if (!emoji) {
        const globalEmoji = customEmojis.find((e) => e.shortcode === shortcode);
        if (globalEmoji) {
          console.log("Found global emoji:", globalEmoji.url);
          return `<img key=${statusId} src="${globalEmoji.url}" alt="${shortcode}" style="width: 20px; height: 20px;" />`;
        }
        return match;
      }

      console.log("Found post-specific emoji:", emoji.url);
      return `<img key=${statusId} src="${emoji.url}" alt="${shortcode}" style="width: 20px; height: 20px;" />`;
    });
  };

  const renderReblogPill = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
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
    const processedContent = replaceEmojis(content, relevantEmojis);
    console.log("Final HTML content:", processedContent);

    if (reblog) {
      return (
        <ReblogContainer>
          <HTMLView
            value={replaceEmojis(reblog.content, relevantEmojis)}
            stylesheet={htmlStyles}
            renderNode={(node, index, siblings, parent, defaultRenderer) => {
              if (node.name === "img") {
                return (
                  <Image
                    source={{ uri: node.attribs.src }}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                );
              }
              return undefined;
            }}
          />
          {reblog.media_attachments.map((media) => (
            <MediaImage key={media.id} source={{ uri: media.url }} />
          ))}
        </ReblogContainer>
      );
    } else {
      return (
        <>
          <HTMLView
            value={processedContent}
            stylesheet={htmlStyles}
            renderNode={(node, index, siblings, parent, defaultRenderer) => {
              if (node.name === "img") {
                return (
                  <Image
                    source={{ uri: node.attribs.src }}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                );
              }
              return undefined;
            }}
          />
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
  img: {
    width: 20,
    height: 20,
    resizeMode: "contain",
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
