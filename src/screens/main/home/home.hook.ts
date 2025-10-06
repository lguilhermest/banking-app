import { useAsyncAction, useAuth, useBiometric, useDialog } from '@hooks';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Paginate, Transaction } from '@types';
import { MainNavigation } from '@navigation';
import { useEffect, useState } from 'react';
import api from '@api';

export function useHome() {
  const auth = useAuth();
  const isFocused = useIsFocused();
  const biometric = useBiometric();
  const dialog = useDialog();
  const { t } = useTranslation();
  const navigation = useNavigation<MainNavigation<'Home'>>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadData = useAsyncAction(async () => {
    const result = await api.get<Paginate<Transaction>>('/transactions', {
      page: 1,
      count: 5,
    });
    setTransactions(result.data);
  });

  useEffect(() => {
    if (isFocused) {
      loadData.execute();
    }
  }, [isFocused]);

  useEffect(() => {
    if (biometric.status === 'unset' && biometric.biometryType !== null) {
      setTimeout(() => {
        dialog()
          .cancelable(t('main.home.biometric.cancel'))
          .onConfirm(() => biometric.confirm(auth.state.credentials))
          .setConfirmText(t('main.home.biometric.confirm'))
          .info(
            t('main.home.biometric.message'),
            t('main.home.biometric.title'),
          );
      }, 500);
    }
  }, [biometric.status]);

  function toggleBalanceVisible() {
    auth.dispatch('balanceVisible', !auth.state.balanceVisible);
  }

  return {
    authState: auth.state,
    toggleBalanceVisible,
    navigate: navigation.navigate,
    biometricType: auth.state.biometric.biometryType,
    transactions,
    loading: loadData.loading,
  };
}
