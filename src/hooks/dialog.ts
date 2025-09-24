import { DialogContext, DialogContextProps } from '@context';
import { useCreateReducer } from './reducer';
import { DialogProps } from '@components';
import { useContext } from 'react';

export function useDialog(): DialogContextProps {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog must be used within DialogProvider');
  }

  return context;
}

export function useDialogController() {
  const [props, setProps] = useCreateReducer<DialogProps>({
    visible: false,
  });

  function close() {
    setProps('visible', false);
  }

  function handleCallback(callback?: () => void) {
    callback?.();
    close();
  }

  function build() {
    return {
      cancelable: (cancelText?: string) => {
        setProps('onCancel', close);
        if (cancelText) setProps('cancelText', cancelText);
        return build();
      },
      setConfirmText: (text: string) => {
        setProps('confirmText', text);
        return build();
      },
    };
  }

  function show(props: Omit<DialogProps, 'visible'>) {
    setProps.update({
      visible: true,
      ...props,
      onConfirm: () => handleCallback(props?.onConfirm),
      onCancel: () => handleCallback(props?.onCancel),
    });
    return build();
  }

  function open(scheme: DialogProps['scheme']) {
    return (
      message: string,
      title?: string,
      onConfirm?: () => void,
      props?: Omit<DialogProps, 'visible' | 'scheme'>,
    ) => {
      return show({
        ...props,
        scheme,
        message,
        title,
        onConfirm: () => handleCallback(onConfirm),
      });
    };
  }

  return {
    info: open('info'),
    danger: open('danger'),
    success: open('success'),
    close,
    props,
  };
}
