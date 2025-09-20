import { StyleSheet, View } from 'react-native';
import { Label } from '../label';
import { TextField, TextFieldProps } from './text-field';
import { Helper } from '../helper';

export interface InputFieldProps extends TextFieldProps {
  label?: string;
  helper?: string;
  errorText?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  helper,
  error,
  errorText,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Label text={label} />
      <TextField error={error} {...props} />
      <Helper text={helper} error={error} errorText={errorText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: '100%',
  },
});
