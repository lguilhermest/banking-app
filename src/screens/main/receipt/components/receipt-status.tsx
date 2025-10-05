import { ActivityIndicator, View } from 'react-native';
import { Icon, IconName, Text } from '@components';
import { OrderStatus } from '@types';
import { useTheme } from '@hooks';
import { ReactNode } from 'react';

export interface StatusProps {
  type: OrderStatus;
  value?: string;
}

export const ReceiptStatus = (props: StatusProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      {statusIconFactory(props.type)}
      <Text>{props.value}</Text>
    </View>
  );
};

const statusIconFactory = (status: OrderStatus): ReactNode => {
  const theme = useTheme();

  const configMap: Record<OrderStatus, { color: string; icon?: IconName }> = {
    [OrderStatus.done]: {
      icon: 'check_circle',
      color: theme.colors.success,
    },
    [OrderStatus.created]: {
      icon: 'clock',
      color: theme.colors.info,
    },
    [OrderStatus.failed]: {
      icon: 'x_circle',
      color: theme.colors.danger,
    },
    [OrderStatus.processing]: {
      color: theme.colors.primary,
    },
  };

  const config = configMap[status];

  return config?.icon ? (
    <Icon name={config?.icon} size={24} color={config.color} weight="fill" />
  ) : (
    <ActivityIndicator size={16} color={theme.colors.primary} />
  );
};
