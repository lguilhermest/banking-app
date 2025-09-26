import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useAuth, useBiometric, useDialog, useMutation } from '@hooks';
import { Paginate, TransactionsWithOwners } from '@types';
import { useTranslation } from 'react-i18next';
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

  const [transactions, setTransactions] = useState<TransactionsWithOwners[]>(
    [],
  );

  const fetchTransactions = useMutation(() => api.get<Paginate<TransactionsWithOwners>>('/transactions'));

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  async function loadData() {
    const result = await fetchTransactions.execute();
    setTransactions(result.data);
  }

  useEffect(() => {
    if (biometric.status === 'unset' && biometric.biometryType !== null) {
      setTimeout(() => {
        dialog
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
    loading: fetchTransactions.loading,
  };
}
