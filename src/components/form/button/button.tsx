import { ActivityIndicator, Text, TouchableHighlight } from 'react-native';
import { ButtonProps } from './button.types';
import { Theme } from '@theme';
import { getButtonStyles } from './button.styles';

export const Button: React.FC<ButtonProps> = ({
  scheme = 'primary',
  variant = 'solid',
  ...props
}) => {
  const styles = getButtonStyles(variant, scheme);

  return (
    <TouchableHighlight
      style={[styles.container, props.style]}
      onPress={props.onPress}
      underlayColor={styles.highlight}
    >
      {props.loading ? (
        <ActivityIndicator size="small" color={Theme.colors.primarySurface} />
      ) : (
        <Text style={[styles.text, props.titleStyle]}>{props.title}</Text>
      )}
    </TouchableHighlight>
  );
};
