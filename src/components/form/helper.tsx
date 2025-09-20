import { Theme } from '@theme';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface HelperProps {
  text?: string;
  error?: boolean;
  errorText?: string;
}

export const Helper: React.FC<HelperProps> = props => {
  const helperStyles: TextStyle[] = [styles.helper];

  if (props.error) {
    return (
      <Text style={[helperStyles, styles.error]}>
        {props.errorText || props.text}
      </Text>
    );
  }

  return <Text style={helperStyles}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  helper: {
    fontSize: 12,
    color: Theme.colors.secondary,
  },
  error: {
    color: Theme.colors.danger,
  },
});
