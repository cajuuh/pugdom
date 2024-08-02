import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import HTMLView from "react-native-htmlview";

interface NotificationCardProps {
  title: string;
  body: string;
  date: string;
  avatar: string;
  username: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  body,
  date,
  avatar,
  username,
}) => {
  const getTimeDifference = (notificationDate: string): string | number => {
    try {
      const now = new Date();
      const notificationTime = new Date(notificationDate);

      if (isNaN(notificationTime.getTime())) {
        console.error("Invalid date format:", notificationDate);
        return "Invalid date";
      }

      const diffInMs = now.getTime() - notificationTime.getTime();
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      return diffInHours;
    } catch (error) {
      console.error("Error calculating time difference:", error);
      return "Error";
    }
  };

  const timeDifference = getTimeDifference(date);

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.userContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.userNameAndDateContainer}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.date}>
              {typeof timeDifference === "number"
                ? `${timeDifference} hours ago`
                : timeDifference}
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.body}>
          <Text>
            <HTMLView value={body} stylesheet={htmlStyles} />
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e6e6e6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    marginLeft: 10,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  userNameAndDateContainer: {
    flexDirection: "column",
    marginLeft: 5,
  },
  username: {
    fontWeight: "bold",
  },
  date: {
    color: "#888",
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
  },
  body: {
    marginTop: 5,
    width: 150,
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    color: "#000",
    flexWrap: "wrap",
    maxWidth: 350,
  },
});

export default NotificationCard;
