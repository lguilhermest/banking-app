import { useRegisterPixKey } from './register-pix-key.hook';
import { Icon, Screen, Text } from '@components';
import { useTranslation } from 'react-i18next';
import { PIX_KEY_TYPE_ICONS } from '@mappers';
import { View } from 'react-native';
import { useTheme } from '@hooks';

export function RegisterPixKeyScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const registerPixKey = useRegisterPixKey();

  return (
    <Screen
      canGoBack
      primaryActionLabel={t('common.confirm')}
      onPrimaryActionPress={registerPixKey.register.execute}
      primaryActionLoading={registerPixKey.register.loading}
    >
      <View style={{ gap: theme.sizes.sm }}>
        <Text variant="heading">
          {t('main.pix_keys.create.title', {
            value: `${registerPixKey.keyType === 'EVP' ? t('common.key') : ''}${registerPixKey.keyTypeLabel}`,
          })}
        </Text>
        <Text variant="body" color="textSecondary">
          {t('main.pix_keys.create.description')}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.secondaryLight,
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.sizes.sm,
          padding: theme.sizes.md,
          borderRadius: theme.sizes.borderRadius,
        }}
      >
        <Icon
          name={PIX_KEY_TYPE_ICONS[registerPixKey.keyType]}
          color="textSecondary"
        />
        <Text variant="body" color="textSecondary">
          {registerPixKey.keyType === 'EVP'
            ? `Chave ${registerPixKey.keyTypeLabel}`
            : registerPixKey.keyValue}
        </Text>
      </View>
    </Screen>
  );
}
