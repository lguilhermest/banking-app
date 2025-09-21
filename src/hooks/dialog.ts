import { useCreateReducer } from './reducer';
import { DialogProps } from '@components';

export function useDialog() {
  const [props, setProps] = useCreateReducer<DialogProps>({
    visible: false,
  });

  const helpers = {
    cancelable,
  };

  function show(props: Omit<DialogProps, 'visible'>) {
    setProps.update({
      visible: true,
      ...props,
      onConfirm: () => handleCallback(props?.onConfirm),
      onCancel: props.onCancel
        ? () => handleCallback(props?.onCancel)
        : undefined,
    });

    return helpers;
  }

  function info(
    message: string,
    title?: string,
    props?: Omit<DialogProps, 'visible' | 'scheme'>,
  ) {
    return show({
      ...props,
      scheme: 'info',
      message,
      title,
      onConfirm: () => handleCallback(props?.onConfirm),
    });
  }

  function danger(
    message: string,
    title?: string,
    onConfirm?: () => void,
    props?: Omit<DialogProps, 'visible' | 'scheme'>,
  ) {
    return show({
      ...props,
      scheme: 'danger',
      message,
      title,
      onConfirm: () => handleCallback(onConfirm),
    });
  }

  function success(
    message: string,
    title?: string,
    onConfirm?: () => void,
    props?: Omit<DialogProps, 'visible' | 'scheme'>,
  ) {
    return show({
      ...props,
      scheme: 'success',
      message,
      title,
      onConfirm: () => handleCallback(onConfirm),
    });
  }

  function cancelable() {
    setProps('onCancel', close);
  }

  function close() {
    setProps('visible', false);
  }

  function handleCallback(callback?: () => void) {
    callback?.();
    close();
  }

  return { danger, success, close, props };
}
