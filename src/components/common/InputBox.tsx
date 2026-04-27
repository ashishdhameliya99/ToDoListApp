import { TextInput, View } from 'react-native';
import React from 'react';
import { InputBoxProps } from '../../interfaces/types';

export default function InputBox({ ...restProps }: InputBoxProps) {
  return (
    <View>
      <TextInput {...restProps} />
    </View>
  );
}
