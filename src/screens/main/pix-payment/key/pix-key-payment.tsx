import { usePixKeyPayment } from './pix-key-payment.hook';
import { Button, InputField, Screen } from '@components';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export function PixKeyPaymentScreen() {
  const { t } = useTranslation();
  const pixType = usePixKeyPayment();

  return (
    <Screen canGoBack title={t('main.pix_key_payment.title')}>
      <View style={{ flex: 1 }}>
        <InputField
          label={t('main.pix_key_payment.key')}
          placeholder={t('main.pix_key_payment.placeholder')}
          {...pixType.form.control.key}
        />
      </View>

      <Button
        title={t('main.pix_key_payment.submit')}
        variant="solid"
        onPress={pixType.onSubmit}
        loading={pixType.loading}
      />
    </Screen>
  );
}
