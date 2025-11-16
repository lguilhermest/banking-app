import { useNavigation } from '@react-navigation/native';
import { AccountSelectScreen } from './account-select';
import { SettingsButton } from './settings.button';
import { useTranslation } from 'react-i18next';
import { useSettings } from './settings.hook';
import { RootNavigation } from '@navigation';
import { Screen } from '@components';
import { useEffect, useState } from 'react';

export function SettingsScreen() {
  const { t } = useTranslation();
  const settings = useSettings(t);
  const [showAccountSelect, setShowAccountSelect] = useState(false);

  useEffect(() => {
    if (showAccountSelect && !settings.auth.state.isFetchingAccount) {
      setShowAccountSelect(false);
    }
  }, [settings.auth.state.isFetchingAccount]);

  return (
    <Screen title={t('main.settings.title')}>
      {settings.showBiometric && (
        <SettingsButton
          toggle
          title={
            settings.isBiometricEnabled
              ? t('main.settings.biometricDisable')
              : t('main.settings.biometricEnable')
          }
          icon="fingerprint"
          toggleValue={settings.isBiometricEnabled}
          onToggle={settings.toggleBiometric}
        />
      )}

      <SettingsButton
        title={t('main.settings.changeAccount')}
        icon="user"
        onPress={() => setShowAccountSelect(true)}
      />
      
      <SettingsButton
        title={t('main.settings.logout.button')}
        icon="logout"
        onPress={settings.logout}
      />

      <AccountSelectScreen
        visible={showAccountSelect}
        onDismiss={() => setShowAccountSelect(false)}
        accounts={settings.auth.state.accounts}
        currentAccountId={settings.auth.state.accountId}
        onConfirm={accountId => {
          settings.auth.changeAccount(accountId);
        }}
        loading={settings.auth.state.isFetchingAccount}
      />
    </Screen>
  );
}
