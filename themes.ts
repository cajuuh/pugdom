import { ThemeType } from "./components/interfaces";

export const lightTheme: ThemeType = {
  backgroundColor: '#F0F1F3',
  textColor: '#000000',
  primaryColor: '#2D9EE0',
  secondaryColor: '#e0e0e0',
  reblogPillColor: '#E9EAEB',
  tabNavigationColor: '#E9EAEB',
  tabNavigationGradient: ['#091E3A', '#2F80ED', '#2D9EE0'],
  notificationsIcon: '#2D9EE0',
  replyDrawerBackgroundColor: '#E7E9EC',
  placeholderTextColor: '#2D9EE0'
};

export const darkTheme: ThemeType = {
  backgroundColor: '#2A2E34',
  textColor: '#E5E5E5',
  primaryColor: '#6575FF',
  secondaryColor: '#444444',
  reblogPillColor: '#1B1A20',
  tabNavigationColor: '#30353C',
  tabNavigationGradient: ["#9400D3", "#4B0082"],
  notificationsIcon: '#6575FF',
  replyDrawerBackgroundColor: '#363636',
  placeholderTextColor: '#6575FF'
};
