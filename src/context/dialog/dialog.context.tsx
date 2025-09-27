import { createContext, PropsWithChildren } from 'react';
import { DialogContextProps } from './dialog.types';
import { useDialogStack } from './dialog.stack';
import { Dialog } from '@components';

export const DialogContext = createContext<DialogContextProps | undefined>(
  undefined,
);

export const DialogProvider = (props: PropsWithChildren) => {
  const { builder, stack } = useDialogStack();

  return (
    <DialogContext.Provider value={{ dialog: builder }}>
      {props.children}

      {stack.map(d => (
        <Dialog key={d.id} {...d} />
      ))}
    </DialogContext.Provider>
  );
};
