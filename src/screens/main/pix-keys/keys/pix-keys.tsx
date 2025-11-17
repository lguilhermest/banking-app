import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal, Icon, Screen, Text } from '@components';
import { PIX_KEY_TYPE_ICONS, PIX_KEY_TYPES } from '@mappers';
import { useNavigation } from '@react-navigation/native';
import { PixKeyRegister } from './pix-key-register';
import { PixKeyActions } from './pix-key-actions';
import { useTranslation } from 'react-i18next';
import { usePixKeys } from './pix-keys.hook';
import { MainNavigation } from '@navigation';
import { ThemeType } from '@theme';
import { useTheme } from '@hooks';
import { useState } from 'react';
import { PixKey } from '@types';

export function PixKeysScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const pixKeys = usePixKeys();
  const styles = createStyles(theme);
  const navigation = useNavigation<MainNavigation<'PixKeys'>>();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <Screen
      scrollable={false}
      title={t('main.pix_keys.keys.title')}
      primaryActionLabel={t('main.pix_keys.keys.register')}
      onPrimaryActionPress={() => setShowCreate(true)}
    >
      <FlatList
        data={pixKeys.keys}
        style={{ flex: 1 }}
        contentContainerStyle={{
          backgroundColor: theme.colors.foreground,
          borderRadius: theme.sizes.borderRadius,
        }}
        renderItem={({ item, index }) => (
          <View style={[styles.card, { borderTopWidth: index > 0 ? 1 : 0 }]}>
            <Icon name={PIX_KEY_TYPE_ICONS[item.type]} />
            <View style={styles.cardContent}>
              <Text variant="body">
                {PIX_KEY_TYPES.find(key => key.value === item.type)?.label}
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

      <PixKeyRegister
        visible={showCreate}
        onDismiss={() => setShowCreate(false)}
        onSelect={type => {
          navigation.navigate('RegisterPixKey', { type });
        }}
      />
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
