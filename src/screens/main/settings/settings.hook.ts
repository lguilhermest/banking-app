import { useBiometric, useDialog } from '@hooks';
import { useAuth } from '@context';

export function useSettings() {
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
      .danger('Deseja sair do app?', 'Sair', () => {
        auth.dispatch('isAuthenticated', false);
        auth.dispatch('refreshToken', '');
        auth.dispatch('isLoading', false);
        biometric.disable();
      })
      .cancelable();
  }

  return {
    showBiometric: biometric.status !== 'unset',
    isBiometricEnabled: biometric.status === 'enabled',
    biometricType: biometric.biometryType,
    toggleBiometric,
    dialog,
    logout,
  };
}
