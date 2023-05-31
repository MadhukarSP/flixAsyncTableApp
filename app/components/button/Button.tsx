import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled: boolean;
};

export default function Button({title, onPress, disabled}: ButtonProps) {
  const buttonStyles = disabled
    ? [styles.button, styles.buttonDisabled]
    : styles.button;
  const buttonTextStyles = disabled
    ? [styles.buttonText, styles.buttonTextDisabled]
    : styles.buttonText;

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      testID="touchableElement">
      <Text style={buttonTextStyles}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    marginHorizontal: 8,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: 'gray',
  },
});
