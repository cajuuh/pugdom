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
} from "./styles/TootCard.style";
import { useWindowDimensions, View } from "react-native";
import HTMLView from "react-native-htmlview";
import { FeedItem, MediaAttachment } from "../../screens/types";
import { formatServerUrl } from "../../utils/utils";

type TootCardProps = {
  content: string;
  profileImageUrl: string;
  mediaAttachments: MediaAttachment[];
  username: string;
  serverUrl: string;
  reblog?: FeedItem;
};

const TootCard: React.FC<TootCardProps> = ({
  content = "",
  profileImageUrl = "",
  mediaAttachments = [],
  username,
  serverUrl,
  reblog,
}) => {
  const { width } = useWindowDimensions();

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
            <ReblogText>
              Boosted from{" "}
              <SourceProfileImage source={{ uri: reblog.account.avatar }} />
              <SourceUsername>{reblog.account.username}</SourceUsername>
            </ReblogText>
          </View>
          <HTMLView value={reblog.content} />
          {reblog.media_attachments.map((media) => (
            <MediaImage key={media.id} source={{ uri: media.url }} />
          ))}
        </ReblogContainer>
      );
    } else {
      return (
        <>
          <HTMLView value={content} />
          {mediaAttachments.map((media) => (
            <MediaImage key={media.id} source={{ uri: media.url }} />
          ))}
        </>
      );
    }
  };

  if (!content && !reblog) {
    return null; // or a placeholder component if necessary
  }

  return (
    <CardContainer>
      <UserInfo>
        <ProfileImage source={{ uri: profileImageUrl }} />
        <UserNameContainer>
          <Username>{username}</Username>
          <Server>{"@" + formatServerUrl(serverUrl)}</Server>
        </UserNameContainer>
      </UserInfo>
      <ContentContainer>{renderCardContent()}</ContentContainer>
    </CardContainer>
  );
};

export default TootCard;
