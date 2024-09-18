import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

const LinkPreview = ({ url }: { url: string }) => {
  const [linkData, setLinkData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinkPreview = async () => {
      try {
        const response = await fetch(
          `https://opengraph.io/api/1.1/site/${encodeURIComponent(
            url
          )}?app_id=YOUR_APP_ID`
        );
        const data = await response.json();
        setLinkData(data.hybridGraph); // OpenGraph.io returns data in `hybridGraph`
      } catch (err) {
        setError("Failed to load link preview.");
      }
    };

    fetchLinkPreview();
  }, [url]);

  if (error) return <Text>{error}</Text>;

  if (!linkData) return null;

  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <View style={{ padding: 10, borderColor: "#ccc", borderWidth: 1 }}>
        {linkData.image && (
          <Image
            source={{ uri: linkData.image }}
            style={{ width: 100, height: 100 }}
          />
        )}
        <Text style={{ fontWeight: "bold" }}>{linkData.title}</Text>
        <Text>{linkData.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LinkPreview;
