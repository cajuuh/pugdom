import React from "react";
import { View } from "react-native";

import { TootScreenNavigationProp, TootScreenRouteProp } from "../types";
import { PugText } from "../../components/Text/Text";

type Props = {
  route: TootScreenRouteProp;
  navigation: TootScreenNavigationProp;
};

export default function TootScreen({ route, navigation }: Props) {
  const { toot } = route.params;

  return (
    <View>
      <PugText>TootScreen</PugText>
    </View>
  );
}
