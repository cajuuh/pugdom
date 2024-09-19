import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { PugText } from "../../components/Text/Text";
import Colors from "../../constants/Colors";
import { useTheme } from "../../hooks/useTheme";
import { getNotifications } from "../../services/notificationService";
import NotificationCard from "./components/NotificationCard/NotificationCard";
import { FeedItem } from "../types"; // Reuse FeedItem as the type for notifications

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<FeedItem[]>([]); // Use FeedItem[] instead of NotificationItem[]
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();

  const fetchNotifications = async () => {
    try {
      const { notifications }: { notifications: FeedItem[] } =
        await getNotifications();
      setNotifications(notifications);
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
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationCard
              title={item.content} // Assuming title maps to content
              body={item.content} // Assuming body maps to content
              date={item.created_at} // Using created_at for date
              avatar={item.account.avatar} // Avatar from account
              username={item.account.username} // Username from account
              media_attachments={item.media_attachments} // Using media_attachments directly
              poll={item.poll} // Poll if available
              customEmojis={item.emojis} // Emojis from status
            />
          )}
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
