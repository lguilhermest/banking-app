import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import { ColorVariant, TypographyVariant } from '@theme';
import { useTheme } from '@hooks';

interface TextProps extends RNTextProps {
  align?: 'left' | 'center' | 'right';
  color?: ColorVariant;
  variant?: TypographyVariant;
  weight?: TextStyle['fontWeight'];
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  weight,
  ...props
}) => {
  const theme = useTheme();
  const color = props.color ? theme.colors[props.color] : theme.colors.text;

  return (
    <RNText
      style={[
        theme.typography[variant],
        {
          color,
          textAlign: props.align,
          fontWeight: weight ?? theme.typography[variant].fontWeight,
        },
        props.style,
      ]}
    >
      {props.children}
    </RNText>
  );
};
