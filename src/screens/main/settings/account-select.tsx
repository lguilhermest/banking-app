import { BottomSheetModal, Icon, Text } from '@components';
import { TouchableOpacity } from 'react-native';
import { useAuth, useTheme } from '@hooks';
import { Account } from '@types';
import { useState } from 'react';

export const AccountSelectScreen = (props: {
  visible?: boolean;
  onDismiss?: () => void;
  accounts?: Account[];
  currentAccountId: number;
  onConfirm?: (accountId: number) => void;
  loading?: boolean;
}) => {
  const theme = useTheme();
  const [accountId, setAccountId] = useState<number>(props.currentAccountId);

  return (
    <BottomSheetModal
      visible={props.visible}
      onDismiss={props.onDismiss}
      title="Trocar de conta"
      primaryActionLabel="Confirmar"
      secondaryActionLabel="Cancelar"
      onPrimaryActionPress={() => props.onConfirm?.(accountId)}
      onSecondaryActionPress={props.onDismiss}
      secondaryActionCancelable
      primaryActionLoading={props.loading}
      dismissable={!props.loading}
    >
      {props.accounts?.map(account => (
        <TouchableOpacity
          activeOpacity={0.6}
          key={account.id}
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.sizes.borderRadius,
            marginBottom: theme.sizes.md,
          }}
          onPress={() => setAccountId(account.id)}
        >
          <Icon
            name="radio_button"
            weight={accountId === account.id ? 'fill' : 'regular'}
          />
          <Text>
            {account.customer.name} - {account.name} | {account.id}
          </Text>
        </TouchableOpacity>
      ))}
    </BottomSheetModal>
  );
};
