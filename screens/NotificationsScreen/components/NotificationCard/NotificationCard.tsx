import React from "react";
import {
  Card,
  Avatar,
  Content,
  Title,
  Body,
  Date as DateStyled, // Renamed to avoid naming conflict with the built-in Date object
  Username,
  UserContainer,
  UserNameAndDateContainer,
} from "./NotificationCard.style";
import HTMLView from "react-native-htmlview";

interface NotificationCardProps {
  title: string;
  body: string;
  date: string; // ISO 8601 date string
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
      const now = new window.Date();
      const notificationTime = new window.Date(notificationDate);

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
    <Card>
      <Content>
        <UserContainer>
          <Avatar source={{ uri: avatar }} />
          <UserNameAndDateContainer>
            <Username>{username}</Username>
            <DateStyled>
              {typeof timeDifference === "number"
                ? `${timeDifference} hours ago`
                : timeDifference}
            </DateStyled>
          </UserNameAndDateContainer>
        </UserContainer>
        <Title>{title}</Title>
        <Body>
          <HTMLView
            value={body}
            stylesheet={{
              p: { color: "#000", flexWrap: "wrap", maxWidth: 350 },
            }}
          />
        </Body>
      </Content>
    </Card>
  );
};

export default NotificationCard;
