import { StyleSheet, View } from 'react-native';
import { DialogFooter } from './dialog.footer';
import { DialogProps } from './dialog.types';
import { Text } from '../../form';
import { Modal } from '../modal';

export const Dialog = ({
  confirmText = 'Ok',
  cancelText = 'Cancelar',
  visible = false,
  ...props
}: DialogProps) => {
  return (
    <Modal visible={visible} onRequestClose={props.onCancel}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text variant="subheading">{props.title}</Text>
          <Text variant="footnote">{props.message}</Text>
        </View>

        <DialogFooter
          scheme={props.scheme}
          onCancel={props.onCancel}
          onConfirm={props.onConfirm}
          cancelText={cancelText}
          confirmText={confirmText}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    gap: 16,
  },
  content: {
    gap: 6,
  },
});
