import { StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native';
import { PasswordField } from './password-field';
import React, { forwardRef } from 'react';
import { Theme } from '@theme';

export interface TextFieldProps extends TextInputProps {
  error?: boolean;
}

export const TextField = forwardRef<TextInput, TextFieldProps>((props, ref) => {
  const fieldStyles: TextStyle[] = [styles.field];
  const Container = props.secureTextEntry ? PasswordField : React.Fragment;

  if (props.error) {
    fieldStyles.push({ borderColor: Theme.colors.danger });
  }

  return (
    <Container>
      <TextInput
        ref={ref}
        style={[Theme.typography.body, fieldStyles]}
        {...props}
      />
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
    paddingHorizontal: 10,
    minHeight: 44,
  },
});
