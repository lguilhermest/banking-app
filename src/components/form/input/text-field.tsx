import { Theme } from '@theme';
import { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native';

export interface TextFieldProps extends TextInputProps {
  error?: boolean;
}

export const TextField = forwardRef<TextInput, TextFieldProps>((props, ref) => {
  const fieldStyles: TextStyle[] = [styles.field];

  if (props.error) {
    fieldStyles.push(styles.error);
  }

  return <TextInput ref={ref} style={fieldStyles} {...props} />;
});

const styles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 5,
    color: Theme.colors.textSecondary,
    fontSize: 16,
    padding: 10,
  },
  error: {
    borderColor: Theme.colors.danger,
  },
});
