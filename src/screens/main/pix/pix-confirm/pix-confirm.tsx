import { Button, InputCurrency, Screen, Text } from '@components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '@navigation';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useTheme } from '@hooks';

export function PixConfirmScreen() {
  const { t } = useTranslation();
  const { params } = useRoute<RouteProp<MainStackParamList, 'PixConfirm'>>();
  const theme = useTheme();

  return (
    <Screen canGoBack title={t('main.pix_payment.title')}>
      <View style={{ gap: theme.sizes.md, flex: 1 }}>
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
      </View>

      <View style={{ gap: theme.sizes.md, flex: 1 }}>
        <InputCurrency
          value={params.amount}
          editable={
            params.qr_code ? params.qr_code?.amount.can_alter_amount : true
          }
        />
      </View>

      <View style={{ flexDirection: 'row', gap: theme.sizes.sm }}>
        <Button
          style={{ flex: 1, width: 'auto' }}
          title={t('main.pix_payment.cancel')}
          onPress={() => {}}
          scheme="secondary"
          variant="outline"
        />
        <Button
          style={{ flex: 1, width: 'auto' }}
          title={t('main.pix_payment.submit')}
          onPress={() => {}}
        />
      </View>
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
