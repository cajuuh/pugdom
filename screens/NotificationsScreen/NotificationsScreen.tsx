import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { PugText } from "../../components/Text/Text";
import { NotificationItem } from "../../components/interfaces";
import { getNotifications } from "../../services/notificationService";
import NotificationCard from "./components/NotificationCard/NotificationCard";

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      const notificationsData = await getNotifications();
      setNotifications(notificationsData);
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PugText style={{ color: "red" }}>{error}</PugText>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {notifications ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <NotificationCard
                title={item.title}
                body={item.body}
                date={item.date}
                avatar={item.account.avatar}
                username={item.account.username}
                mediaAttachments={item.mediaAttachments}
              />
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <PugText>No notifications</PugText>
      )}
    </View>
  );
};

export default NotificationsScreen;
