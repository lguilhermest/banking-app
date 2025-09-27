import { TextStyle, ViewStyle } from 'react-native';
import { DialogSchemeType } from './dialog.types';
import { Theme } from '@theme';

export const schemes: Record<
  DialogSchemeType,
  {
    cancel?: ViewStyle;
    cancelText?: TextStyle;
    confirm?: ViewStyle;
    confirmText?: TextStyle;
  }
> = {
  danger: {
    confirmText: {
      color: Theme.colors.danger,
    },
  },
  success: {
    confirmText: {
      color: Theme.colors.successSurface,
    },
  },
  info: {
    confirmText: {
      color: Theme.colors.info,
    },
  },
};
