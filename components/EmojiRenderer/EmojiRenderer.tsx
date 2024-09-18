import React from "react";
import { Image } from "react-native";
import HTMLView from "react-native-htmlview";
import LinkPreview from "../../utils/LinkPreview";

type Emoji = {
  shortcode: string;
  url: string;
};

type EmojiRendererProps = {
  content: string;
  emojis: Emoji[];
  stylesheet: any;
};

const EmojiRenderer: React.FC<EmojiRendererProps> = ({
  content,
  emojis,
  stylesheet,
}) => {
  const extractFirstURL = (content: string) => {
    const regex = /(https?:\/\/[^\s]+)/g;
    const match = content.match(regex);
    return match ? match[0] : null;
  };

  const replaceEmojis = (text: string, emojis: Emoji[]) => {
    return text.replace(/:([a-zA-Z0-9_]+):/g, (match, shortcode) => {
      const emoji = emojis.find((e) => e.shortcode === shortcode);
      if (emoji) {
        return `<img src="${emoji.url}" alt="${shortcode}" style="width: 20px; height: 20px;" />`;
      }
      return match;
    });
  };

  const firstURL = extractFirstURL(content);

  const processedContent = replaceEmojis(content, emojis);

  const wrappedContent = !processedContent.trim().startsWith("<p>")
    ? `<p>${processedContent}</p>`
    : processedContent;

  return (
    <HTMLView
      value={wrappedContent}
      stylesheet={stylesheet}
      renderNode={(node, index, siblings, parent, defaultRenderer) => {
        if (node.name === "img") {
          return (
            <Image
              key={index}
              source={{ uri: node.attribs.src }}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          );
        }
        return undefined;
      }}
    />
  );
};

export default EmojiRenderer;
