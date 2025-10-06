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
    navigation.replace('PixConfirm', {
      amount: mock.amount.amount_to_pay,
      end_to_end_id: mock.end_to_end_id,
      pixKey: mock.key,
      qr_code: {
        amount: mock.amount as any,
        type: mock.type as any,
        expiration: mock.expiration,
        transaction_id: mock.transaction_id,
        additional_data: mock.additional_data,
      },
      beneficiary: {
        name: mock.name,
        participant: mock.participant,
      },
    });
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

const mock = {
  type: 'QRDN',
  key: {
    value: '2171ccec-145c-4c73-95be-23d1ee966428',
    type: 'EVP',
  },
  amount: {
    amount_to_pay: 10,
    amount: 10,
    final_amount: null,
    original_amount: null,
    change_amount: null,
    withdrawal_amount: null,
    can_alter_amount: false,
  },
  end_to_end_id: 'E12345678202510060138dDTmbnJKJEW',
  name: 'Andressa Santos Santos',
  participant: {
    ispb: '12573115',
    name: 'NEL3 PAY IP LTDA.',
    short_name: 'NEL3 PAY IP LTDA.',
  },
  expiration: 600,
  transaction_id: 'TX202510060138qlQ7CQBdRjPSE',
  additional_data: [],
};
