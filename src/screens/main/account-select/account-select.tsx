import { BottomSheetScreen, Button, Icon, Text } from '@components';
import { useAuth, useBottomSheetScreen, useTheme } from '@hooks';
import { TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';

export function AccountSelectScreen() {
  const theme = useTheme();
  const bottomSheet = useBottomSheetScreen();
  const { state, changeAccount } = useAuth();
  const [changed, setChanged] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<number>(
    state.accountId,
  );

  function hanleConfirm() {
    changeAccount(selectedAccountId);
  }

  useEffect(() => {
    if (state.isFetchingAccount) {
      setChanged(true);
    }
    if (changed && !state.isFetchingAccount) {
      bottomSheet.close();
    }
  }, [changed, state.isFetchingAccount]);

  return (
    <BottomSheetScreen
      getBottomSheetRef={bottomSheet.getRef}
      dismissable={!state.isFetchingAccount}
    >
      {state.accounts?.map(account => (
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
          }}
          onPress={() => setSelectedAccountId(account.id)}
        >
          <Icon
            name="radio_button"
            weight={selectedAccountId === account.id ? 'fill' : 'regular'}
          />
          <Text>
            {account.customer.name} - {account.name} | {account.id}
          </Text>
        </TouchableOpacity>
      ))}

      <View
        style={{
          flexDirection: 'row',
          gap: theme.sizes.lg,
          marginTop: theme.sizes.lg,
        }}
      >
        <Button
          title="Cancelar"
          variant="outline"
          scheme="secondary"
          style={{ flex: 1, width: 'auto' }}
          onPress={bottomSheet.close}
          disabled={state.isFetchingAccount}
        />

        <Button
          title="Trocar de conta"
          style={{ flex: 1, width: 'auto' }}
          onPress={hanleConfirm}
          loading={state.isFetchingAccount}
        />
      </View>
    </BottomSheetScreen>
  );
}
