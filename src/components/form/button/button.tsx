import { ActivityIndicator, Text, TouchableHighlight } from 'react-native';
import { ButtonProps } from './button.types';
import { getButtonStyles } from './button.styles';
import { useTheme } from '@hooks';

export const Button: React.FC<ButtonProps> = ({
  scheme = 'primary',
  variant = 'solid',
  ...props
}) => {
  const theme = useTheme();
  const styles = getButtonStyles(theme, variant, scheme);

  return (
    <TouchableHighlight
      style={[styles.container, props.style]}
      onPress={props.onPress}
      underlayColor={styles.highlight}
      disabled={props.disabled || props.loading}
    >
      {props.loading ? (
        <ActivityIndicator size="small" color={theme.colors.primarySurface} />
      ) : (
        <Text style={[styles.text, props.titleStyle]}>{props.title}</Text>
      )}
    </TouchableHighlight>
  );
};
