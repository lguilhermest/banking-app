import { createContext, PropsWithChildren } from 'react';
import { useDialogController } from '@hooks';
import { Dialog } from '@components';

export type DialogContextProps = ReturnType<typeof useDialogController>;

export const DialogContext = createContext<DialogContextProps | undefined>(
  undefined,
);

export const DialogProvider = (props: PropsWithChildren) => {
  const dialog = useDialogController();

  return (
    <DialogContext.Provider value={dialog}>
      {props.children}

      <Dialog {...dialog.props} />
    </DialogContext.Provider>
  );
};
