import { useEffect, useState } from 'react';
import { useBiometric } from '@hooks';
import { useAuth } from '@context';

export function useHome() {
  const auth = useAuth();
  const biometric = useBiometric();
  const [showAskBiometric, setShowAskBiometric] = useState(false);

  useEffect(() => {
    if (biometric.status === 'unset' && biometric.biometryType) {
      setShowAskBiometric(true);
    }
  }, [biometric.status]);

  function enableBiometric() {
    setShowAskBiometric(false);
    biometric.confirm(auth.state.refreshToken);
  }

  function disableBiometric() {
    setShowAskBiometric(false);
    biometric.cancel();
  }

  return {
    showAskBiometric,
    enableBiometric,
    disableBiometric,
    biometricType: auth.state.biometric.biometryType,
    dialog: {
      visible: showAskBiometric,
      onConfirm: enableBiometric,
      onCancel: disableBiometric,
      title: 'Ativar Biometria?',
      message: `Deseja usar o ${auth.state.biometric.biometryType} para entrar mais rápido no app?`,
      confirmText: 'Ativar',
      cancelText: 'Agora não',
    },
  };
}
