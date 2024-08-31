import { ThemeType } from "./components/interfaces";

export const lightTheme: ThemeType = {
  backgroundColor: "#666666",
  textColor: "#000000",
  buttonTextColor: "#E7E7E8",
  primaryColor: "#2D9EE0",
  secondaryColor: "#e0e0e0",
  reblogPillColor: "#E9EAEB",
  tabNavigationColor: "#E9EAEB",
  tabNavigationGradient: ["#091E3A", "#2F80ED", "#2D9EE0"],
  notificationsIcon: "#2D9EE0",
  replyDrawerBackgroundColor: "#E7E9EC",
  placeholderTextColor: "#96989C",
  drawerHandleColor: "#ccc",
};

export const darkTheme: ThemeType = {
  backgroundColor: "#2A2E34",
  textColor: "#E5E5E5",
  buttonTextColor: "#E7E7E8",
  primaryColor: "#6575FF",
  secondaryColor: "#444444",
  reblogPillColor: "#1B1A20",
  tabNavigationColor: "#30353C",
  tabNavigationGradient: ["#9400D3", "#4B0082"],
  notificationsIcon: "#6575FF",
  replyDrawerBackgroundColor: "#363636",
  placeholderTextColor: "#666666",
  drawerHandleColor: "#3A3A44",
};
