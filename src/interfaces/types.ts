import { GestureResponderEvent, TextInputProps } from 'react-native';

export interface InputBoxProps extends TextInputProps {}

export interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  color: string;
  disabled?: boolean;
}

export interface ThemeContextType {
  dark: boolean;
  toggleTheme: () => void;
}

export interface HeaderProps {
  text: string;
  backText?: string;
}

export interface AddItemProps {
  closeSheet: () => void;
  show?: true;
  lang?: 'en';
  pickerButtonOnPress?: (item: any) => void;
}
export interface Todo {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  dob: string;
  favorite: string | boolean;
}
