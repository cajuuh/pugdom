import React from "react";
import { Image } from "react-native";
import HTMLView from "react-native-htmlview";

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
  const replaceEmojis = (text: string, emojis: Emoji[]) => {
    return text.replace(/:([a-zA-Z0-9_]+):/g, (match, shortcode) => {
      const emoji = emojis.find((e) => e.shortcode === shortcode);
      if (emoji) {
        return `<img src="${emoji.url}" alt="${shortcode}" style="width: 20px; height: 20px;" />`;
      }
      return match;
    });
  };

  const processedContent = replaceEmojis(content, emojis);

  return (
    <HTMLView
      value={processedContent}
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
