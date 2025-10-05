import { RouteProp, useRoute } from '@react-navigation/native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { useEffect, useRef, useState } from 'react';
import { MainStackParamList } from '@navigation';
import { Share } from 'react-native';
import { Transaction } from '@types';
import { useMutation } from '@hooks';
import api from '@api';

function useFetchTransaction() {
  return useMutation((transactionId: number) =>
    api.get<Transaction>(`/transactions/${transactionId}`),
  );
}

export function useReceipt() {
  const viewShotRef = useRef<ViewShot>(null);
  const fetchTransaction = useFetchTransaction();
  const {
    params: { transactionId },
  } = useRoute<RouteProp<MainStackParamList, 'Receipt'>>();
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    fetchTransaction.execute(transactionId);
  }, [transactionId]);

  async function share() {
    if (!viewShotRef.current) return;

    try {
      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 1,
      });

      // setSharing(false);

      await Share.share({
        url: `file://${uri}`,
        message: 'Comprovante da transação',
      });
    } catch (err) {
      console.error('Erro ao compartilhar recibo:', err);
    }
  }

  return {
    ...fetchTransaction,
    execute: () => fetchTransaction.execute(transactionId),
    viewShotRef,
    share,
    sharing,
  };
}
