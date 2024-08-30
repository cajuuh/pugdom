import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { PugText } from '../Text/Text';


interface PugButtonProps extends TouchableOpacityProps {
  title: string;
}

const PugButton: React.FC<PugButtonProps> = ({ title, style, ...props }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: theme.secondaryColor }, style]} {...props}>
      <PugText style={[styles.text, { color: theme.buttonTextColor }]}>{title}</PugText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PugButton;
