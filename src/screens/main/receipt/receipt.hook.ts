import { RouteProp, useRoute } from '@react-navigation/native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { useEffect, useRef, useState } from 'react';
import { MainStackParamList } from '@navigation';
import { useAsyncAction } from '@hooks';
import { Share } from 'react-native';
import { Transaction } from '@types';
import api from '@api';

export function useReceipt() {
  const viewShotRef = useRef<ViewShot>(null);
  const {
    params: { transactionId },
  } = useRoute<RouteProp<MainStackParamList, 'Receipt'>>();
  const [transaction, setTransaction] = useState<Transaction>();

  const fetchTransaction = useAsyncAction(async (transactionId: number) => {
    const result = await api.get<Transaction>(`/transactions/${transactionId}`);
    setTransaction(result);
  });

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

      await Share.share({
        url: `file://${uri}`,
        message: 'Comprovante da transação',
      });
    } catch (err) {
      console.error('Erro ao compartilhar recibo:', err);
    }
  }

  return {
    data: transaction,
    viewShotRef,
    share,
  };
}
