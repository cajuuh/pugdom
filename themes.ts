import { ThemeType } from "./components/interfaces";

export const lightTheme: ThemeType = {
  backgroundColor: "#F8F9F9",
  textColor: "#222222", // Improved contrast
  buttonTextColor: "#222222", // High contrast for light buttons
  primaryColor: "#2D9EE0",
  secondaryColor: "#51A7F9", // More vibrant button background
  secondaryColor50opacity: "#51A7F980",
  reblogPillColor: "#E9EAEB",
  tabNavigationColor: "#E9EAEB",
  tabNavigationGradient: ["#091E3A", "#2F80ED", "#2D9EE0"],
  notificationsIcon: "#2D9EE0",
  activeButtonColor: "#6575FF",
  replyDrawerBackgroundColor: "#E7E9EC",
  placeholderTextColor: "#96989C",
  drawerHandleColor: "#CCCCCC",
  attention: "#E64A19",
  noAltTextColor: "#E7E9EC",
  modalBackground: "#F8F9F9",
  // Optional: add shadowColor for buttons/containers
  shadowColor: "#00000012",
};

export const darkTheme: ThemeType = {
  backgroundColor: "#2A2E34",
  textColor: "#E5E5E5",
  buttonTextColor: "#FFFFFF", // High contrast for dark buttons
  primaryColor: "#BEC4F7",
  secondaryColor: "#6575FF", // More vibrant button background
  secondaryColor50opacity: "#6575FF80",
  reblogPillColor: "#1B1A20",
  tabNavigationColor: "#30353C",
  tabNavigationGradient: ["#9400D3", "#4B0082"],
  notificationsIcon: "#6575FF",
  activeButtonColor: "#6575FF",
  replyDrawerBackgroundColor: "#363636",
  placeholderTextColor: "#AFAFAF",
  drawerHandleColor: "#AFAFAF",
  attention: "#E64A19",
  noAltTextColor: "#363636",
  modalBackground: "#32323A",
  shadowColor: "#00000044",
};
