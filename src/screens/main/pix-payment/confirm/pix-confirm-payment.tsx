import {
  PixConfirmPaymentSchema,
  PixConfirmPaymentSchemaT,
} from './pix-confirm-payment.schema';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { InputCurrency, Screen, Text } from '@components';
import { MainNavigation, MainStackParamList } from '@navigation';
import { usePixConfirm } from './pix-confirm-payment.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useAuth, useTheme } from '@hooks';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

export function PixConfirmPaymentScreen() {
  const { t } = useTranslation();
  const { params } =
    useRoute<RouteProp<MainStackParamList, 'PixConfirmPayment'>>();
  const { state } = useAuth();
  const theme = useTheme();
  const pixConfirm = usePixConfirm();
  const navigation = useNavigation<MainNavigation<'PixConfirmPayment'>>();

  const form = useForm<PixConfirmPaymentSchemaT>({
    resolver: zodResolver(PixConfirmPaymentSchema(state.balance)),
    defaultValues: {
      amount: params.amount,
    },
  });

  return (
    <Screen
      canGoBack
      title={t('main.pix_confirm_payment.title')}
      primaryActionLabel={t('main.pix_confirm_payment.submit')}
      secondaryActionLabel={t('main.pix_confirm_payment.cancel')}
      primaryActionLoading={pixConfirm.loading}
      onPrimaryActionPress={form.handleSubmit(pixConfirm.handleSubmit)}
      onSecondaryActionPress={() => navigation.goBack()}
    >
      <Item
        label={t('main.pix_confirm_payment.participant')}
        value={params.beneficiary.participant.short_name}
      />

      <Item
        label={t('main.pix_confirm_payment.txid')}
        value={params.qr_code?.transaction_id}
      />

      <Item
        label={t('main.pix_confirm_payment.key')}
        value={params.pixKey?.value}
      />

      {params?.qr_code?.additional_data.map((item, index) => (
        <Item key={index} label={item.name} value={item.value} />
      ))}

      <Item
        label={t('main.pix_confirm_payment.name')}
        value={params.beneficiary.name}
      />

      <Item
        label={t('main.pix_confirm_payment.document')}
        value={params.beneficiary.document_number}
      />
      <InputCurrency
        autoFocus
        field="amount"
        form={form}
        style={{ marginTop: theme.sizes.lg }}
        editable={
          params.qr_code ? params.qr_code?.amount.can_alter_amount : true
        }
      />
    </Screen>
  );
}

const Item = (props: { label?: string; value?: string }) => {
  return props.value ? (
    <View>
      <Text color="textSecondary">{props.label}</Text>
      <Text>{props.value}</Text>
    </View>
  ) : null;
};
