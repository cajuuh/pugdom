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
} from "./styles/TootCard.style";
import { useWindowDimensions, View } from "react-native";
import HTMLView from "react-native-htmlview";
import { FeedItem, MediaAttachment } from "../../screens/types";

type TootCardProps = {
  content: string;
  profileImageUrl: string;
  mediaAttachments: MediaAttachment[];
  reblog?: FeedItem;
};

const TootCard: React.FC<TootCardProps> = ({
  content = "",
  profileImageUrl = "",
  mediaAttachments = [],
  reblog,
}) => {
  const { width } = useWindowDimensions();

  return (
    <CardContainer>
      <ProfileImage source={{ uri: profileImageUrl }} />
      <ContentContainer>
        {reblog ? (
          <ReblogContainer>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <SourceProfileImage source={{ uri: reblog.account.avatar }} />
              <ReblogText>
                Boosted from{" "}
                <SourceUsername>{reblog.account.username}</SourceUsername>:
              </ReblogText>
            </View>
            <HTMLView value={reblog.content} />
            {reblog.media_attachments.map((media) => (
              <MediaImage key={media.id} source={{ uri: media.url }} />
            ))}
          </ReblogContainer>
        ) : (
          <>
            <HTMLView value={content} />
            {mediaAttachments.map((media) => (
              <MediaImage key={media.id} source={{ uri: media.url }} />
            ))}
          </>
        )}
      </ContentContainer>
    </CardContainer>
  );
};

export default TootCard;
