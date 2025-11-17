import { useNavigation, useRoute } from '@react-navigation/native';
import { useAsyncAction, useAuth } from '@hooks';
import { MainNavigation, RootRouteProp } from '@navigation';
import { PIX_KEY_TYPES } from '@mappers';
import { useMemo } from 'react';
import api from '@api';

export function useRegisterPixKey() {
  const auth = useAuth();
  const { params } = useRoute<RootRouteProp<'RegisterPixKey'>>();
  const navigation = useNavigation<MainNavigation<'RegisterPixKey'>>();
  
  const keyValue = useMemo(() => {
    if (params.type === 'CNPJ' || params.type === 'CPF') {
      return auth.state.account.customer.document_number;
    }
    if (params.type === 'EMAIL') {
      return auth.state.account.customer.email;
    }
    if (params.type === 'PHONE') {
      return auth.state.account.customer.phone_number;
    }
    return undefined;
  }, []);

  const register = useAsyncAction(async () => {
    await api.post('/pix_keys', {
      keyType: params.type,
    });
    await auth.fetchAccountData();
    navigation.goBack();

  });

  return {
    keyValue,
    keyType: params.type,
    keyTypeLabel: PIX_KEY_TYPES.find(
      key => key.value === params.type,
    )?.label,
    register,
  };
}
