import { HomeButton, HomeButtonProps } from './home-button';
import { HomeTransactions } from './home-transactions';
import { MainStackParamList } from '@navigation';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { HomeBalance } from './home-balance';
import { Screen, Text } from '@components';
import { useHome } from './home.hook';
import { Theme } from '@theme';

export function HomeScreen() {
  const { t } = useTranslation();
  const home = useHome();

  const buttons: Array<
    Omit<HomeButtonProps, 'onPress'> & { href?: keyof MainStackParamList }
  > = [
    {
      title: t('main.home.buttons.sendPix'),
      icon: 'pix',
      href: 'PixKeyPayment',
    },
    {
      title: t('main.home.buttons.payQrCode'),
      icon: 'qr_code',
      href: 'PixQrcodePayment',
    },
    {
      title: t('main.home.buttons.myKeys'),
      icon: 'key',
    },
    {
      title: t('main.home.buttons.settings'),
      icon: 'gear',
      href: 'Settings',
    },
  ];

  return (
    <Screen
      safeContainerStyle={{ paddingBottom: 0 }}
      style={{
        padding: 0,
      }}
    >
      <View style={styles.content}>
        <View>
          <Text variant="footnote" color="secondary">
            {t('main.home.hello')}
          </Text>
          <Text variant="subheading">{home.authState.user.name}</Text>
        </View>

        <HomeBalance
          isVisible={home.authState.balanceVisible}
          value={home.authState.balance}
          onToggle={home.toggleBalanceVisible}
        />

        <View style={styles.buttons}>
          {buttons.map((button, index) => (
            <HomeButton
              key={index}
              {...button}
              onPress={() => {
                if (button.href) {
                  home.navigate(button.href as any);
                }
              }}
            />
          ))}
        </View>
      </View>

      <HomeTransactions
        data={home.transactions}
        onTransactionPress={transaction =>
          home.navigate('Receipt', {
            transactionId: transaction.id,
          })
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  content: {
    padding: Theme.sizes.lg,
    gap: Theme.sizes.md,
    backgroundColor: Theme.colors.background,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    gap: Theme.sizes.md,
  },
});
