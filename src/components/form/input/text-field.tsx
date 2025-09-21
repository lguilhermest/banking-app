import { Theme } from '@theme';
import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native';
import { PasswordField } from './password-field';

export interface TextFieldProps extends TextInputProps {
  error?: boolean;
}

export const TextField = forwardRef<TextInput, TextFieldProps>((props, ref) => {
  const fieldStyles: TextStyle[] = [styles.field];
  const Container = props.secureTextEntry ? PasswordField : React.Fragment;

  if (props.error) {
    fieldStyles.push(styles.error);
  }

  return (
    <Container>
      <TextInput ref={ref} style={fieldStyles} {...props} />
    </Container>
  );
});

const styles = StyleSheet.create({
  field: {
    backgroundColor: Theme.colors.foreground,
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
