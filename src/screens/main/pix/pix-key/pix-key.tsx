import { Button, InputField, Screen } from '@components';
import { useTranslation } from 'react-i18next';
import { usePixKey } from './pix-key.hook';
import { View } from 'react-native';

export function PixKeyScreen() {
  const { t } = useTranslation();
  const pixType = usePixKey();

  return (
    <Screen canGoBack title={t('main.pix_key.title')}>
      <View style={{ flex: 1 }}>
        <InputField
          label={t('main.pix_key.key')}
          placeholder={t('main.pix_key.placeholder')}
          {...pixType.form.control.key}
        />
      </View>

      <Button
        title={t('main.pix_key.submit')}
        variant="solid"
        onPress={pixType.onSubmit}
        loading={pixType.loading}
      />
    </Screen>
  );
}
