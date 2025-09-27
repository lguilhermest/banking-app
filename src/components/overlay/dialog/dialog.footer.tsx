import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { DialogFooterProps } from './dialog.types';
import { schemes } from './dialog.styles';
import { Text } from '@components';
import { Theme } from '@theme';

export const DialogFooter = (props: DialogFooterProps) => {
  const scheme = schemes[props.scheme || 'info'];

  return (
    <View style={styles.container}>
      {props.onCancel && (
        <TouchableOpacity
          style={[styles.button, scheme.cancel]}
          onPress={props.onCancel}
        >
          <Text variant="button" style={[styles.buttonText, scheme.cancelText]}>
            {props.cancelText}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, scheme.confirm]}
        onPress={props.onConfirm}
      >
        <Text
          variant="button"
          style={[styles.buttonText, scheme.confirmText]}
        >
          {props.confirmText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Theme.sizes.xs,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40
  },
  buttonText: {
    textTransform: 'uppercase',
    paddingHorizontal: Theme.sizes.md,
  },
});
