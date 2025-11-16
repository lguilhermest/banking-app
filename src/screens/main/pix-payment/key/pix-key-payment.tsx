import { usePixKeyPayment } from './pix-key-payment.hook';
import { InputField, Screen } from '@components';
import { useTranslation } from 'react-i18next';

export function PixKeyPaymentScreen() {
  const { t } = useTranslation();
  const pixType = usePixKeyPayment();

  return (
    <Screen
      canGoBack
      title={t('main.pix_key_payment.title')}
      primaryActionLabel={t('main.pix_key_payment.submit')}
      onPrimaryActionPress={pixType.onSubmit}
      primaryActionLoading={pixType.loading}
    >
      <InputField
        label={t('main.pix_key_payment.key')}
        placeholder={t('main.pix_key_payment.placeholder')}
        {...pixType.form.control.key}
      />
    </Screen>
  );
}
