import { DialogContext, DialogContextProps } from '@context';
import { useContext, useEffect, useMemo } from 'react';
import { useCreateReducer } from './reducer';
import { DialogProps } from '@components';

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
    return () => {
      callback?.();
      close();
    };
  }

  function build() {
    return {
      onConfirm: (callback?: () => void) => {
        setProps('onConfirm', handleCallback(callback));
        return build();
      },
      onCancel: (callback?: () => void) => {
        setProps('onCancel', handleCallback(callback));
        return build();
      },
      cancelable: (cancelText?: string) => {
        setProps('onCancel', close);
        if (cancelText) setProps('cancelText', cancelText);
        return build();
      },
      setConfirmText: (text: string) => {
        setProps('confirmText', text);
        return build();
      },
      info: open('info'),
      danger: open('danger'),
      success: open('success'),
    };
  }

  function show(props: Omit<DialogProps, 'visible'>) {
    setProps.update({
      ...props,
      visible: true,
    });
  }

  function open(scheme: DialogProps['scheme']) {
    return (message: string, title?: string) => {
      return show({
        ...props,
        scheme,
        message,
        title,
        onConfirm: props.onConfirm || close,
      });
    };
  }

  return {
    ...build(),
    close,
    props,
  };
}
