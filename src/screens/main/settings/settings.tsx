import { SettingsButton } from './settings.button';
import { useSettings } from './settings.hook';
import { Dialog, Screen } from '@components';

export function SettingsScreen() {
  const settings = useSettings();

  return (
    <Screen title="Ajustes">
      {settings.showBiometric && (
        <SettingsButton
          toggle
          title={
            settings.isBiometricEnabled
              ? 'Desabilitar Biometria'
              : 'Habilitar Biometria'
          }
          icon="fingerprint"
          toggleValue={settings.isBiometricEnabled}
          onToggle={settings.toggleBiometric}
        />
      )}

      <SettingsButton title="Sair" icon="logout" onPress={settings.logout} />

      <Dialog {...settings.dialog.props} />
    </Screen>
  );
}
