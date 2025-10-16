import { useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import { DecodeQrCode } from 'src/types/qr-code';
import { MainNavigation } from '@navigation';
import { useEffect, useState } from 'react';
import { useAsyncAction } from '@hooks';
import api from '@api';

export function usePixQrcode() {
  const navigation = useNavigation<MainNavigation<'PixQrcode'>>();
  const qrCodeScanner = useScanQrcode();
  const [fetching, setFetching] = useState(false);

  const fetchQrcode = useAsyncAction(async (qr_code: string) => {
    const response = await api.post<DecodeQrCode>('/pix/qrc_data', { qr_code });
    setFetching(false);
    navigation.replace('PixConfirm', {
      amount: response.amount.amount_to_pay,
      end_to_end_id: response.end_to_end_id,
      pixKey: response.key,
      qr_code: {
        amount: response.amount,
        type: response.type,
        expiration: response.expiration,
        transaction_id: response.transaction_id,
        additional_data: response.additional_data,
      },
      beneficiary: {
        name: response.name,
        participant: response.participant,
      },
    });
  });

  useEffect(() => {
    if (qrCodeScanner.code && !fetching) {
      setFetching(true);
      fetchQrcode.execute(qrCodeScanner.code);
    }
  }, [qrCodeScanner.code]);

  return { qrCodeScanner, fetching };
}

export function useScanQrcode() {
  const device = useCameraDevice('back');
  const [code, setCode] = useState<string>();

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        const value = codes[0]?.value;
        if (value) {
          setCode(value);
        }
      }
    },
  });

  return { code, device, codeScanner };
}
