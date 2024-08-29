import { ThemeType } from "./components/interfaces";

export const lightTheme: ThemeType = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  primaryColor: '#2D9EE0',
  secondaryColor: '#e0e0e0',
  reblogPillColor: '#E9EAEB',
  tabNavigationColor: '#E9EAEB',
  tabNavigationGradient: ['#091E3A', '#2F80ED', '#2D9EE0'],
  notificationsIcon: '#2D9EE0'
};

export const darkTheme: ThemeType = {
  backgroundColor: '#27272F',
  textColor: '#E5E5E5',
  primaryColor: '#6575FF',
  secondaryColor: '#444444',
  reblogPillColor: '#1B1A20',
  tabNavigationColor: '#1B1A20',
  tabNavigationGradient: ["#9400D3", "#4B0082"],
  notificationsIcon: '#6575FF'
};
