import { TextStyle, ViewStyle } from 'react-native';

export type ButtonVariant = 'outline' | 'solid' | 'link';

export type ButtonScheme = 'primary' | 'secondary';

export type ButtonStyles = Record<
  ButtonScheme,
  Partial<{
    container: ViewStyle;
    text: TextStyle;
    highlight: string;
  }>
>;

export interface ButtonProps {
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  variant?: ButtonVariant;
  scheme?: ButtonScheme;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}
