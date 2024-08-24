export const removeHtmlTags = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

export const formatServerUrl = (url: string) => {
  return url
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .split("@")[0];
};

export const getTimeDifference = (
  notificationDate: string
): string | number => {
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
