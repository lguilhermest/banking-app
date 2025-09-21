import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { ColorVariant, Theme, TypographyVariant } from '@theme';

interface TextProps extends RNTextProps {
  align?: 'left' | 'center' | 'right';
  color?: ColorVariant;
  variant?: TypographyVariant;
}

export const Text: React.FC<TextProps> = ({ variant = 'body', ...props }) => {
  const color = props.color ? Theme.colors[props.color] : Theme.colors.text;

  return (
    <RNText
      style={[
        Theme.typography[variant],
        { color, textAlign: props.align },
        props.style,
      ]}
    >
      {props.children}
    </RNText>
  );
};
