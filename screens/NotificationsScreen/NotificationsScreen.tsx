import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { PugText } from "../../components/Text/Text";
import { NotificationItem } from "../../components/interfaces";
import Colors from "../../constants/Colors";
import { useTheme } from "../../hooks/useTheme";
import { getNotifications } from "../../services/notificationService";
import NotificationCard from "./components/NotificationCard/NotificationCard";
import { Emoji } from "../types";

interface NotificationsResponse {
  notifications: NotificationItem[];
  customEmojis: Emoji[];
}

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [customEmojis, setCustomEmojis] = useState<Emoji[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();

  const fetchNotifications = async () => {
    try {
      const { notifications, customEmojis }: NotificationsResponse =
        await getNotifications();
      setNotifications(notifications);
      setCustomEmojis(customEmojis);
    } catch (error) {
      setError("Error fetching notifications. Please try again.");
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.primaryColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PugText style={{ color: Colors.red }}>{error}</PugText>
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, padding: 16, backgroundColor: theme.backgroundColor }}
    >
      {notifications ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <NotificationCard
                  title={item.title}
                  body={item.body}
                  date={item.date}
                  avatar={item.account.avatar}
                  username={item.account.username}
                  mediaAttachments={item.mediaAttachments}
                  poll={item.poll}
                  customEmojis={customEmojis} // Pass customEmojis
                />
              </View>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primaryColor}
            />
          }
        />
      ) : (
        <PugText style={{ color: theme.textColor }}>No notifications</PugText>
      )}
    </View>
  );
};

export default NotificationsScreen;
