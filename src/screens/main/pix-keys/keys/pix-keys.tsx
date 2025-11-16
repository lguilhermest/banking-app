import {
  BottomSheetModal,
  Button,
  Icon,
  IconName,
  Screen,
  Text,
} from '@components';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PixKeyActions } from './pix-key-actions';
import { useTranslation } from 'react-i18next';
import { usePixKeys } from './pix-keys.hook';
import { ThemeType } from '@theme';
import { useTheme } from '@hooks';
import { PixKey } from '@types';

const ICONS: Record<string, IconName> = {
  EVP: 'alert',
  PHONE: 'phone',
  EMAIL: 'mail',
  DOCUMENT: 'fingerprint',
};

export function PixKeysScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const pixKeys = usePixKeys();
  const styles = createStyles(theme);

  return (
    <Screen scrollable={false} title={t('main.pix_keys.keys.title')}>
      <FlatList
        data={pixKeys.keys}
        style={{ flex: 1 }}
        contentContainerStyle={{
          backgroundColor: theme.colors.foreground,
          borderRadius: theme.sizes.borderRadius,
        }}
        renderItem={({ item, index }) => (
          <View style={[styles.card, { borderTopWidth: index > 0 ? 1 : 0 }]}>
            <Icon name={ICONS[item.type]} />
            <View style={styles.cardContent}>
              <Text variant="body">
                {t(`common.pix_key_type.${item.type}`)}
              </Text>
              <Text variant="footnote" color="textSecondary">
                {item.value}
              </Text>
            </View>

            <TouchableOpacity onPress={() => pixKeys.setSelectedKey(item)}>
              <Icon
                name="dots_three_vertical"
                weight="bold"
                color="textSecondary"
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <Button title={t('main.pix_keys.keys.add')} onPress={() => {}} />

      <PixKeyActions
        visible={!!pixKeys.selectedKey}
        onDismiss={() => pixKeys.setSelectedKey(undefined)}
        title={t('common.pix_key_type.' + pixKeys.selectedKey?.type)}
        onShare={() => pixKeys.handleShareKey(pixKeys.selectedKey as PixKey)}
        onDelete={() => pixKeys.setShowDelete(true)}
      />

      <BottomSheetModal
        visible={pixKeys.showDelete}
        title={t('main.pix_keys.keys.delete')}
        onDismiss={() => pixKeys.setShowDelete(false)}
        primaryActionLabel={t('common.delete')}
        primaryActionScheme="danger"
        primaryActionLoading={pixKeys.isDeleting}
        onPrimaryActionPress={pixKeys.deleteKey}
        secondaryActionLabel={t('common.cancel')}
        onSecondaryActionPress={() => pixKeys.setShowDelete(false)}
      >
        <Text variant="body">{pixKeys.selectedKey?.value}</Text>
      </BottomSheetModal>
    </Screen>
  );
}

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.sizes.lg,
      borderColor: theme.colors.border,
      padding: theme.sizes.md,
    },
    cardContent: {
      flex: 1,
      justifyContent: 'space-between',
      gap: theme.sizes.xs,
    },
  });
