import { BottomSheetModal, Text } from '@components';
import { PixKey } from '@types';

export const PixKeyDelete = (props: {
  visible?: boolean;
  onDismiss?: () => void;
  pixKey?: PixKey;
  onDelete?: () => void;
  isDeleting?: boolean;
}) => {
  return (
    <BottomSheetModal
      visible={props.visible}
      title="Deseja realmente excluir a chave?"
      onDismiss={props.onDismiss}
      primaryActionLabel={'Confirmar'}
      primaryActionScheme="danger"
      primaryActionLoading={props.isDeleting}
      onPrimaryActionPress={props.onDelete}
      secondaryActionLabel="Cancelar"
      onSecondaryActionPress={props.onDismiss}
    >
      <Text variant="body">{props.pixKey?.value}</Text>
    </BottomSheetModal>
  );
};
