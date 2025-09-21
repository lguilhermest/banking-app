import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Modal, ModalBaseProps } from './modal';

interface DialogProps extends ModalBaseProps {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const Dialog = ({
  confirmText = 'Ok',
  cancelText = 'Cancelar',
  visible = false,
  ...props
}: DialogProps) => {
  return (
    <Modal visible={visible} onClose={props.onCancel}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.message}</Text>

        <View style={styles.actions}>
          {props.onCancel && (
            <Pressable
              style={[styles.button, styles.cancel]}
              onPress={props.onCancel}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </Pressable>
          )}

          <Pressable
            style={[styles.button, styles.confirm]}
            onPress={props.onConfirm}
          >
            <Text style={styles.confirmText}>{confirmText}</Text>
          </Pressable>
        </View>
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
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancel: {
    backgroundColor: '#eee',
  },
  confirm: {
    backgroundColor: '#007AFF',
  },
  cancelText: {
    color: '#333',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
  },
});
