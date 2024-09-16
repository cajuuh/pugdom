import React from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";

import {
  MediaAttachment,
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
} from "./TootScreen.style";
import { PugText } from "../../components/Text/Text";
import CustomIcon from "../../utils/Icons";

const { width } = Dimensions.get("window");

type Props = {
  route: TootScreenRouteProp;
  navigation: TootScreenNavigationProp;
};

export default function TootScreen({ route, navigation }: Props) {
  const { toot } = route.params;
  const theme = useTheme();
  const htmlStyles = TootCardHtmlStyles(theme);

  const renderMediaItem = ({ item }: { item: MediaAttachment }) => (
    <MediaImage
      key={item.id}
      source={{ uri: item.url }}
      style={{ width: width - 15, height: "50%", marginRight: "2%" }}
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
              {/* Create a strings for in18 */}
              Back
            </PugText>
          </BackButtonContainer>
        </TouchableOpacity>
      </HeaderContainer>
      <DataContainer>
        <ProfileImageContainer>
          <ProfileImage source={{ uri: toot.profileImageUrl }} />
        </ProfileImageContainer>
        <EmojiRenderer
          content={toot.content}
          emojis={toot.customEmojis}
          stylesheet={htmlStyles}
        />
        <FlatList
          data={toot.mediaAttachments}
          renderItem={renderMediaItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </DataContainer>
    </Container>
  );
}
