import { Camera } from 'react-native-vision-camera';
import { usePixQrcodePayment } from './pix-qrcode-payment.hook';
import { StyleSheet } from 'react-native';
import { Screen } from '@components';

export function PixQrcodePaymentScreen() {
  const pixQrcode = usePixQrcodePayment();

  return (
    <Screen canGoBack loadingAction={pixQrcode.fetching}>
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
