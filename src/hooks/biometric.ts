import { BiometricStatus, KeychainService } from '@services';
import { useEffect } from 'react';
import { BIOMETRY_TYPE } from 'react-native-keychain';
import { useCreateReducer } from './reducer';

export interface BiometricState {
  status: BiometricStatus;
  biometryType: BIOMETRY_TYPE | null;
}

export function useBiometric() {
  const [state, dispatch] = useCreateReducer<BiometricState>({
    status: undefined,
    biometryType: null,
  });

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    const status = await KeychainService.getBiometricStatus();
    const type = await KeychainService.getBiometryType();

    dispatch.update({
      status,
      biometryType: type,
    });
  }

  async function cancel() {
    await KeychainService.saveBiometricStatus('disabled');
  }

  async function confirm(refreshToken: string) {
    await KeychainService.saveRefreshToken(refreshToken);

    const token = await KeychainService.getRefreshToken();

    if (token) {
      await KeychainService.saveBiometricStatus('enabled');
    } else {
      await KeychainService.saveBiometricStatus('disabled');
    }
  }

  async function authenticate(): Promise<string | null> {
    try {
      const token = await KeychainService.getRefreshToken();
      if(!token){
        await KeychainService.saveBiometricStatus('disabled');
        throw 'disabled';
      }

      return token;
    } catch (error) {
      return null;
    }
  }

  return {
    ...state,
    cancel,
    confirm,
    authenticate,
  };
}
