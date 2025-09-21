import { TextStyle, ViewStyle } from 'react-native';
import { DialogSchemeType } from './dialog.types';
import { Theme } from '@theme';

export const schemes: Record<
  DialogSchemeType,
  {
    cancel?: ViewStyle;
    cancelText?: TextStyle;
    confirm: ViewStyle;
    confirmText: TextStyle;
  }
> = {
  danger: {
    confirm: {
      backgroundColor: Theme.colors.danger,
    },
    confirmText: {
      color: Theme.colors.dangerSurface,
    },
  },
  success: {
    confirmText: {
      color: Theme.colors.successSurface,
    },
    confirm: {
      backgroundColor: Theme.colors.success,
    },
  },
  info: {
    confirm: {
      backgroundColor: Theme.colors.info,
    },
    confirmText: {
      color: Theme.colors.info,
    },
  },
};
