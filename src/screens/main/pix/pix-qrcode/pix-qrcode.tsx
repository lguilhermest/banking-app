import { Camera } from 'react-native-vision-camera';
import { usePixQrcode } from './pix-qrcode.hook';
import { StyleSheet } from 'react-native';
import { Screen } from '@components';

export function PixQrcodeScreen() {
  const pixQrcode = usePixQrcode();

  return (
    <Screen canGoBack actionLoading={pixQrcode.fetching}>
      {pixQrcode.qrCodeScanner.device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={pixQrcode.qrCodeScanner.device}
          codeScanner={pixQrcode.qrCodeScanner.codeScanner}
          isActive={true}
        />
      )}
    </Screen>
  );
}
