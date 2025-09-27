import { DialogContext, DialogContextProps } from '@context';
import { useContext } from 'react';

export function useDialog(): DialogContextProps['dialog'] {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog must be used within DialogProvider');
  }

  return context.dialog
}
