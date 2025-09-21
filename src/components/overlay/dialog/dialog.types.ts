import { ModalBaseProps } from '../modal';

export type DialogSchemeType = 'danger' | 'success' | 'info';

export interface DialogFooterProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  confirmText?: string;
  scheme?: DialogSchemeType;
}

export interface DialogProps extends ModalBaseProps, DialogFooterProps {
  title?: string;
  message?: string;
}
