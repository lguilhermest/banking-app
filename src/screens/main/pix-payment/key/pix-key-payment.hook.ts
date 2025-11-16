import { PixKeySchema, PixKeySchemaType } from './pix-key-payment.schema';
import { PixKeySearchResponse, PixKeyType } from '@types';
import { useNavigation } from '@react-navigation/native';
import { useAsyncAction, useForm } from '@hooks';
import { MainNavigation } from '@navigation';
import { formatPixKey } from '@utils';
import { useState } from 'react';
import api from '@api';

export function usePixKeyPayment() {
  const navigation = useNavigation<MainNavigation<'PixKeyPayment'>>();
  const [keyType, setKeyType] = useState<PixKeyType>();
  const form = useForm(
    PixKeySchema,
    {
      key: 'nome@email.com',
    },
    {
      key: (value: string) => formatPixKey(value, keyType),
    },
  );

  /*   function onChangeText(value: string) {
    setKeyType(getPixKeyType(value));
    setKey(value);
  } */

  const fetchPixKey = useAsyncAction(async (data: PixKeySchemaType) => {
    const response = await api.post<PixKeySearchResponse>(`/pix/search_key`, {
      pix_key: form.state.key,
    });

    navigation.navigate('PixConfirmPayment', {
      beneficiary: {
        name: response.name,
        participant: response.participant,
        document_number: response.document_number,
      },
      pixKey: response.key,
      amount: 0,
      end_to_end_id: response.end_to_end_id,
    });
  });

  return {
    form,
    keyType,
    onSubmit: form.handleSubmit(fetchPixKey.execute),
    loading: fetchPixKey.loading,
  };
}
