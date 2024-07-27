import React from "react";
import {
  Card,
  Avatar,
  Content,
  Title,
  Body,
  Date,
  Username,
} from "./NotificationCard.style";
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
  return (
    <Card>
      <Avatar source={{ uri: avatar }} />
      <Content>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Body>
          <HTMLView value={body} />
        </Body>
        <Username>{username}</Username>
      </Content>
    </Card>
  );
};

export default NotificationCard;
