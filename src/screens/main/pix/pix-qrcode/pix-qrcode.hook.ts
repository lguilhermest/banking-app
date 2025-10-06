import { useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { DecodeQrCode } from 'src/types/qr-code';
import { useEffect, useState } from 'react';
import { useAsyncAction } from '@hooks';
import api from '@api';

export function usePixQrcode() {
  const qrCodeScanner = useScanQrcode();
  const [fetching, setFetching] = useState(false);

  const fetchQrcode = useAsyncAction(async (qr_code: string) => {
    const response = await api.post<DecodeQrCode>('/pix/qrc_data', { qr_code });
    setFetching(false);
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