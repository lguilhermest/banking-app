import { ActivityIndicator, View } from 'react-native';
import { Icon, IconName, Text } from '@components';
import { OrderStatus } from '@types';
import { useTheme } from '@hooks';
import { ReactNode } from 'react';
import { ColorVariant } from '@theme';

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

  const configMap: Record<OrderStatus, { color: ColorVariant; icon?: IconName }> = {
    [OrderStatus.done]: {
      icon: 'check_circle',
      color: 'success',
    },
    [OrderStatus.created]: {
      icon: 'clock',
      color: 'info',
    },
    [OrderStatus.failed]: {
      icon: 'x_circle',
      color: 'danger',
    },
    [OrderStatus.processing]: {
      color: 'primary',
    },
  };

  const config = configMap[status];

  return config?.icon ? (
    <Icon name={config?.icon} size={24} color={config.color} weight="fill" />
  ) : (
    <ActivityIndicator size={16} color={theme.colors.primary} />
  );
};
