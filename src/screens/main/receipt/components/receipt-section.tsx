import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';

export const ReceiptSection = (props: PropsWithChildren<{ label: string }>) => {
  const theme = useTheme();
  return (
    <View
      style={{
        gap: theme.sizes.sm,
        borderTopWidth: 2,
        borderColor: theme.colors.border,
        borderStyle: 'dotted',
        paddingTop: theme.sizes.md,
      }}
    >
      <Text weight="600">{props.label}</Text>
      <View style={{ gap: theme.sizes.sm }}>{props.children}</View>
    </View>
  );
};
