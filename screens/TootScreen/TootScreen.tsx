import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import {
  MediaAttachment,
  PollOption,
  Tag,
  TootScreenNavigationProp,
  TootScreenRouteProp,
} from "../types";
import EmojiRenderer from "../../components/EmojiRenderer/EmojiRenderer";
import { useTheme } from "../../hooks/useTheme";
import TootCardHtmlStyles from "../../utils/htmlStyles";
import {
  Container,
  MediaImage,
  ProfileImageContainer,
  ProfileImage,
  DataContainer,
  HeaderContainer,
  BackButtonContainer,
  MediaContainer,
} from "./TootScreen.style";
import { PugText } from "../../components/Text/Text";
import CustomIcon from "../../utils/Icons";
import useTootContext from "../../context/TootContext";

const { width } = Dimensions.get("window");

type Props = {
  route: TootScreenRouteProp;
  navigation: TootScreenNavigationProp;
};

export default function TootScreen({ route, navigation }: any) {
  const { toot } = route.params;
  const theme = useTheme();
  const htmlStyles = TootCardHtmlStyles(theme);
  const { thread, loading, error } = useTootContext(toot.in_reply_to_id);

  const originalToot = toot.reblog ? toot.reblog : toot;

  console.log(
    "===================== ORIGINAL TOOT START ====================="
  );
  console.log(originalToot);
  console.log("===================== ORIGINAL TOOT END =====================");

  const renderMediaItem = ({ item }: { item: MediaAttachment }) => (
    <MediaImage
      key={item.id}
      source={{ uri: item.url }}
      style={{ width: width - 50, height: "50%", marginRight: "2%" }}
    />
  );

  return (
    <Container>
      <HeaderContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButtonContainer>
            <CustomIcon
              name="ChevronLeftIcon"
              size={20}
              color={theme.textColor}
            />
            <PugText
              style={{ marginLeft: 10, fontSize: 18, color: theme.textColor }}
            >
              Back
            </PugText>
          </BackButtonContainer>
        </TouchableOpacity>
      </HeaderContainer>

      {toot.sensitive && toot.spoilerText && (
        <View style={{ padding: 10, backgroundColor: theme.attention }}>
          <PugText style={{ color: theme.textColor, fontWeight: "bold" }}>
            {toot.spoilerText}
          </PugText>
        </View>
      )}

      {loading && <ActivityIndicator size="small" color={theme.textColor} />}
      {error && <PugText style={{ color: "red" }}>{error}</PugText>}

      {thread && thread.ancestors.length > 0 && (
        <View style={{ padding: 10 }}>
          <PugText style={{ color: theme.textColor, fontWeight: "bold" }}>
            Thread:
          </PugText>
          {thread.ancestors.map((ancestor) => (
            <View key={ancestor.id} style={{ marginVertical: 5 }}>
              <PugText style={{ color: theme.textColor }}>
                {ancestor.content}
              </PugText>
            </View>
          ))}
        </View>
      )}

      <DataContainer>
        <ProfileImageContainer>
          <ProfileImage
            source={{
              uri: originalToot?.account?.avatar
                ? originalToot?.account?.avatar
                : originalToot.profileImageUrl,
            }}
          />
        </ProfileImageContainer>

        <EmojiRenderer
          content={originalToot.content}
          emojis={originalToot.emojis}
          stylesheet={htmlStyles}
        />

        {toot.poll && (
          <View style={{ padding: 10 }}>
            <PugText style={{ color: theme.textColor }}>
              Poll: {toot.poll.question}
            </PugText>
            {toot.poll.options.map((option: PollOption, index: string) => (
              <PugText key={index} style={{ color: theme.textColor }}>
                {option.title} - {option.votes_count} votes
              </PugText>
            ))}
          </View>
        )}

        {toot.tags?.length > 0 && (
          <View style={{ padding: 10 }}>
            <PugText style={{ color: theme.textColor, fontWeight: "bold" }}>
              Tags:
            </PugText>
            {toot.tags.map((tag: Tag) => (
              <PugText key={tag.name} style={{ color: theme.textColor }}>
                #{tag.name}
              </PugText>
            ))}
          </View>
        )}

        {toot.card && (
          <View style={{ padding: 10 }}>
            <PugText style={{ color: theme.textColor, fontWeight: "bold" }}>
              {toot.card.title}
            </PugText>
            <PugText style={{ color: theme.textColor }}>
              {toot.card.description}
            </PugText>
            {toot.card.image && (
              <MediaImage
                source={{ uri: toot.card.image }}
                style={{ width: width - 15, height: 150 }}
              />
            )}
          </View>
        )}
      </DataContainer>

      {originalToot.media_attachments.length === 1 ? (
        <MediaContainer>
          <MediaImage source={{ uri: originalToot.media_attachments[0].url }} />
        </MediaContainer>
      ) : (
        <FlatList
          data={originalToot.media_attachments}
          renderItem={renderMediaItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      )}
    </Container>
  );
}
