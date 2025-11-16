import { Pressable, Modal as RNModal, StyleSheet, View } from 'react-native';

export interface ModalBaseProps {
  visible?: boolean;
  onRequestClose?: () => void;
}

export interface ModalProps extends ModalBaseProps {
  children?: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  return (
    <RNModal
      visible={props.visible}
      transparent
      animationType="fade"
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.overlay}>{props.children}</View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});
