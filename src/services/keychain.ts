import * as Keychain from 'react-native-keychain';
import { StorageService } from './storage';
import { APP_NAME } from '@env';

export type BiometricStatus = 'enabled' | 'disabled' | 'unset';

export class KeychainService {
  static async getRefreshToken(): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword({
      service: APP_NAME,
      authenticationPrompt: {
        title: 'Autentique-se',
        cancel: 'Cancelar',
      },
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    });
    return credentials ? credentials.password : null;
  }

  static async saveRefreshToken(token: string): Promise<void> {
    await Keychain.setGenericPassword('refreshToken', token, {
      service: APP_NAME,
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
      accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
      authenticationPrompt: {
        title: 'Autentique-se',
        cancel: 'Cancelar',
      },
    });
  }

  static async removeRefreshToken(): Promise<void> {
    await Keychain.resetGenericPassword({
      service: APP_NAME,
    });
  }

  static async getBiometryType(): Promise<Keychain.BIOMETRY_TYPE | null> {
    return await Keychain.getSupportedBiometryType();
  }

  static async getBiometricStatus(): Promise<BiometricStatus> {
    const value = await StorageService.getItem('biometricStatus');
    if (value == null) return 'unset';
    return value as BiometricStatus;
  }

  static async saveBiometricStatus(status: BiometricStatus): Promise<void> {
    await StorageService.setItem('biometricStatus', status);
  }
}
