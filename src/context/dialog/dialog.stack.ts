import { DialogStackProps } from './dialog.types';
import { useState } from 'react';

export function useDialogStack() {
  const [stack, setStack] = useState<Array<DialogStackProps>>([]);

  function close(id: number) {
    setStack(prev => prev.filter(d => d.id !== id));
  }

  function handleCallback(id: number, callback?: () => void) {
    return () => {
      callback?.();
      close(id);
    };
  }

  function show(
    id: number,
    scheme: DialogStackProps['scheme'],
    builderProps?: Partial<DialogStackProps>,
  ) {
    return (message: string, title?: string) => {
      setStack(prev => [
        ...prev,
        {
          onConfirm: handleCallback(id, builderProps?.onConfirm),
          ...builderProps,
          visible: true,
          id,
          scheme,
          message,
          title,
        },
      ]);
    };
  }

  function builder(props?: Partial<DialogStackProps>) {
    const id = props?.id ?? Date.now();

    return {
      cancelable: (cancelText: string = 'Cancelar') =>
        builder({
          ...props,
          id,
          cancelText,
          onCancel: handleCallback(id),
        }),
      setProps: (props: Partial<DialogStackProps>) =>
        builder({
          ...props,
          id,
        }),
      setConfirmText: (text: string) =>
        builder({
          ...props,
          id,
          confirmText: text,
        }),
      onConfirm: (callback?: () => void) =>
        builder({
          ...props,
          id,
          onConfirm: handleCallback(id, callback),
        }),
      onCancel: (callback?: () => void) =>
        builder({
          ...props,
          id,
          onCancel: handleCallback(id, callback),
        }),
      info: show(id, 'info', props),
      danger: show(id, 'danger', props),
      success: show(id, 'success', props),
    };
  }

  return {
    stack,
    builder,
  };
}
