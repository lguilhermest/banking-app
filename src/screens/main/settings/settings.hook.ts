import { useAuth, useBiometric, useDialog } from '@hooks';
import { TFunction } from 'i18next';

export function useSettings(t: TFunction) {
  const auth = useAuth();
  const dialog = useDialog();
  const biometric = useBiometric();

  async function toggleBiometric() {
    if (biometric.status === 'enabled') {
      await biometric.disable();
    } else {
      await biometric.enable(auth.state.credentials);
    }
  }

  function logout() {
    dialog
      .onConfirm(() => {
        auth.dispatch('isAuthenticated', false);
        auth.dispatch('refreshToken', '');
        auth.dispatch('isLoading', false);
        biometric.disable();
      })
      .cancelable(t('main.settings.logout.cancel'))
      .setConfirmText(t('main.settings.logout.button'))
      .danger(
        t('main.settings.logout.message'),
        t('main.settings.logout.title'),
      );
  }

  return {
    showBiometric: biometric.status !== 'unset',
    isBiometricEnabled: biometric.status === 'enabled',
    biometricType: biometric.biometryType,
    toggleBiometric,
    logout,
  };
}
