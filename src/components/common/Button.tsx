import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { lightTheme, darkTheme } from '../../utils/color';
import { CustomButtonProps } from '../../interfaces/types';
import { useAppTheme } from '../../hooks/themeContext';

const CustomButton = ({ title, onPress }: CustomButtonProps) => {
  const { dark } = useAppTheme();
  const theme = dark ? darkTheme : lightTheme;

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.button,
      padding: 12,
      marginVertical: 5,
      borderRadius: 8,
    },
    buttonTitle: {
      color: '#fff',
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
