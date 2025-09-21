import { BiometricStatus, KeychainService } from '@services';
import { BIOMETRY_TYPE } from 'react-native-keychain';
import { useCreateReducer } from './reducer';
import { useEffect } from 'react';

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
    await enable(refreshToken);
  }

  async function authenticate(): Promise<string | null> {
    try {
      const token = await KeychainService.getRefreshToken();

      if (!token) {
        await KeychainService.saveBiometricStatus('disabled');
        throw 'disabled';
      }

      return token;
    } catch (error) {
      return null;
    }
  }

  async function enable(refreshToken: string) {
    await KeychainService.saveRefreshToken(refreshToken);

    const token = await KeychainService.getRefreshToken();

    if (token) {
      await KeychainService.saveBiometricStatus('enabled');
      dispatch.update({ status: 'enabled' }); 
    } else {
      await KeychainService.saveBiometricStatus('disabled');
      dispatch.update({ status: 'disabled' });
    }
  }

  async function disable() {
    await KeychainService.saveBiometricStatus('disabled');
    await KeychainService.saveRefreshToken('');
    dispatch.update({ status: 'disabled' });
  }

  return {
    ...state,
    cancel,
    confirm,
    authenticate,
    enable,
    disable,
  };
}
