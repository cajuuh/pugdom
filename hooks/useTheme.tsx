import { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContext } from 'styled-components';
import { ThemeType } from '../components/interfaces';
import { darkTheme, lightTheme } from '../themes';

export const useTheme = (): ThemeType => {
  const theme = useContext(ThemeContext) as ThemeType | undefined;
  const systemColorScheme = useColorScheme();

  if (theme) {
    return theme;
  }

  // Fallback to the system theme
  return systemColorScheme === 'dark' ? darkTheme : lightTheme;
};
