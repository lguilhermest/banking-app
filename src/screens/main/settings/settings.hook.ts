import { useBiometric, useDialog } from '@hooks';
import { TFunction } from 'i18next';
import { useAuth } from '@context';

export function useSettings(t: TFunction) {
  const dialog = useDialog();
  const auth = useAuth();
  const biometric = useBiometric();

  async function toggleBiometric() {
    if (biometric.status === 'enabled') {
      await biometric.disable();
    } else {
      await biometric.enable(auth.state.refreshToken);
    }
  }

  function logout() {
    dialog
    .danger(
        t('main.settings.logout.message'),
        t('main.settings.logout.title'),
        () => {
          auth.dispatch('isAuthenticated', false);
          auth.dispatch('refreshToken', '');
          auth.dispatch('isLoading', false);
          biometric.disable();
        },
      )
      .cancelable(t('main.settings.logout.cancel'))
      .setConfirmText(t('main.settings.logout.button'));
  }

  return {
    showBiometric: biometric.status !== 'unset',
    isBiometricEnabled: biometric.status === 'enabled',
    biometricType: biometric.biometryType,
    toggleBiometric,
    logout,
  };
}
