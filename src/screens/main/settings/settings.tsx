import { SettingsButton } from './settings.button';
import { useTranslation } from 'react-i18next';
import { useSettings } from './settings.hook';
import { Screen } from '@components';

export function SettingsScreen() {
  const { t } = useTranslation();
  const settings = useSettings(t);

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
        title={t('main.settings.logout.button')}
        icon="logout"
        onPress={settings.logout}
      />
    </Screen>
  );
}
