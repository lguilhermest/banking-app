import {
  ReceiptHeader,
  ReceiptPayer,
  ReceiptRecipient,
  ReceiptTransaction,
} from './sections';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PaperCut, Screen } from '@components';
import ViewShot from 'react-native-view-shot';
import { useReceipt } from './receipt.hook';
import { PixPayment } from '@types';
import { ThemeType } from '@theme';
import { useTheme } from '@hooks';

export function ReceiptScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = createStyles(theme);
  const receipt = useReceipt();

  return (
    <Screen
      loading={!receipt?.data}
      title={t('main.receipt.title')}
      rightIcon="share_fat"
      onRightIconPress={receipt.share}
    >
      {!!receipt?.data && (
        <ViewShot ref={receipt.viewShotRef}>
          <View style={styles.content}>
            <ReceiptHeader data={receipt?.data} />

            <ReceiptTransaction data={receipt?.data} />

            {receipt?.data?.owner_type === 'Core\\Models\\PixPayment' &&
              (receipt.data.amount > 0 ? (
                <ReceiptPayer data={receipt?.data.owner as PixPayment} />
              ) : (
                <ReceiptRecipient data={receipt?.data.owner as PixPayment} />
              ))}
          </View>
          <PaperCut
            color={theme.colors.foreground}
            height={10}
            width={Dimensions.get('window').width - theme.sizes.lg * 2}
          />
        </ViewShot>
      )}
    </Screen>
  );
}

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    content: {
      backgroundColor: theme.colors.foreground,
      padding: theme.sizes.lg,
      gap: theme.sizes.lg,
    },
    amount: {
      gap: 4,
    },
  });
