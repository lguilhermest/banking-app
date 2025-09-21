import { Pressable, StyleSheet, View } from 'react-native';
import { DialogFooterProps } from './dialog.types';
import { schemes } from './dialog.styles';
import { Text } from '@components';
import { Theme } from '@theme';

export const DialogFooter = (props: DialogFooterProps) => {
  const scheme = schemes[props.scheme || 'info'];

  return (
    <View style={styles.container}>
      {props.onCancel && (
        <Pressable
          style={[styles.button, scheme.cancel]}
          onPress={props.onCancel}
        >
          <Text variant="button" style={scheme.cancelText}>
            {props.cancelText}
          </Text>
        </Pressable>
      )}

      <Pressable
        style={[styles.button, scheme.confirm]}
        onPress={props.onConfirm}
      >
        <Text variant="button" style={scheme.confirmText}>
          {props.confirmText}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Theme.sizes.md,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.secondaryLight,
    padding: Theme.sizes.md,
    minWidth: 60,
    borderRadius: 6,
  },
});
