import { DialogProps } from '@components';

export interface DialogStackProps extends DialogProps {
  id: number;
}

export interface DialogSchemeMethods {
  info: DialogFunction;
  danger: DialogFunction;
  success: DialogFunction;
}

export interface DialogBuilder extends DialogSchemeMethods {
  cancelable: (cancelText?: string) => DialogBuilder;
  setConfirmText: (text: string) => DialogBuilder;
  onConfirm: (callback: () => void) => DialogBuilder;
  onCancel: (callback: () => void) => DialogBuilder;
  setProps: (props: Partial<DialogStackProps>) => DialogBuilder;
}

export type DialogFunction = (
  message: string,
  title?: string,
  props?: Partial<Omit<DialogStackProps, 'id'>>,
) => void;

export type DialogContextProps = {
  dialog: () => DialogBuilder;
};
