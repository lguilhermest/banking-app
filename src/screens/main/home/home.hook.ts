import { useAuth } from '@context';
import { useBiometric } from '@hooks';
import { useEffect, useState } from 'react';

export function useHome() {
  const auth = useAuth();
  const biometric = useBiometric();
  const [showAskBiometric, setShowAskBiometric] = useState(false);

  useEffect(() => {
    if (
      biometric.status === 'unset' &&
      biometric.biometryType
    ) {
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
  };
}
