import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';


interface PugLayoutProps extends ViewProps {
  children: React.ReactNode;
}

const PugLayout: React.FC<PugLayoutProps> = ({ children, style, ...props }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // You can adjust this padding to your needs
  },
});

export default PugLayout;
