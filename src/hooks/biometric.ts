import { BiometricStatus, KeychainService } from '@services';
import { BIOMETRY_TYPE } from 'react-native-keychain';
import { useCreateReducer } from './reducer';
import { UserCredentials } from '@types';
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

  async function confirm(credentials: UserCredentials) {
    await enable(credentials);
  }

  async function authenticate(): Promise<{
    email: string;
    password: string;
  } | null> {
    try {
      const credentials = await KeychainService.getUserCredentials();

      if (!credentials) {
        await KeychainService.saveBiometricStatus('disabled');
        throw 'disabled';
      }

      return credentials;
    } catch (error) {
      return null;
    }
  }

  async function enable(credentials: UserCredentials) {
    await KeychainService.saveUserCredentials(credentials);

    const creds = await KeychainService.getUserCredentials();

    if (creds) {
      await KeychainService.saveBiometricStatus('enabled');
      dispatch.update({ status: 'enabled' });
    } else {
      await KeychainService.saveBiometricStatus('disabled');
      dispatch.update({ status: 'disabled' });
    }
  }

  async function disable() {
    await KeychainService.saveBiometricStatus('disabled');
    await KeychainService.removeUserCredentials();
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
