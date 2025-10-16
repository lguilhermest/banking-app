import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button, InputCurrency, Screen, Text } from '@components';
import { MainNavigation, MainStackParamList } from '@navigation';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useTheme } from '@hooks';

export function PixConfirmScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { params } = useRoute<RouteProp<MainStackParamList, 'PixConfirm'>>();
  const navigation = useNavigation<MainNavigation<'PixConfirm'>>();

  const FooterComponent = () => (
    <View
      style={{
        flexDirection: 'row',
        gap: theme.sizes.sm,
        padding: theme.sizes.lg,
      }}
    >
      <Button
        style={{ flex: 1, width: 'auto' }}
        title={t('main.pix_payment.cancel')}
        onPress={() => navigation.goBack()}
        scheme="secondary"
        variant="outline"
      />
      <Button
        style={{ flex: 1, width: 'auto' }}
        title={t('main.pix_payment.submit')}
        onPress={() => {}}
      />
    </View>
  );

  return (
    <Screen
      canGoBack
      title={t('main.pix_payment.title')}
      footerComponent={<FooterComponent />}
    >
      <Item
        label={t('main.pix_payment.participant')}
        value={params.beneficiary.participant.short_name}
      />

      <Item
        label={t('main.pix_payment.txid')}
        value={params.qr_code?.transaction_id}
      />

      <Item label={t('main.pix_payment.key')} value={params.pixKey?.value} />

      {params?.qr_code?.additional_data.map((item, index) => (
        <Item key={index} label={item.name} value={item.value} />
      ))}

      <Item
        label={t('main.pix_payment.name')}
        value={params.beneficiary.name}
      />

      <Item
        label={t('main.pix_payment.document')}
        value={params.beneficiary.document_number}
      />
      <InputCurrency
        autoFocus
        style={{ marginTop: theme.sizes.lg }}
        value={params.amount}
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
