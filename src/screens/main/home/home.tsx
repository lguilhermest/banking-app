import { MainNavigation, MainStackParamList } from '@navigation';
import { HomeButton, HomeButtonProps } from './home.button';
import { useNavigation } from '@react-navigation/native';
import { HomeTransactions } from './home.transactions';
import { Dialog, Screen, Text } from '@components';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { HomeBalance } from './home.balance';
import { useHome } from './home.hook';
import { useAuth } from '@context';
import { Theme } from '@theme';

export function HomeScreen() {
  const { state, dispatch } = useAuth();
  const home = useHome();
  const navigation = useNavigation<MainNavigation<'Home'>>();
  const { t } = useTranslation();

  const buttons: Array<
    Omit<HomeButtonProps, 'onPress'> & { href?: keyof MainStackParamList }
  > = [
    {
      title: t('main.home.buttons.sendPix'),
      icon: 'pix',
    },
    {
      title: t('main.home.buttons.payQrCode'),
      icon: 'qr_code',
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
      safeContainerStyle={{
        paddingBottom: 0,
      }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View>
          <Text variant="footnote" color="secondary">
            {t('main.home.hello')}
          </Text>
          <Text variant="subheading">{state.user.name}</Text>
        </View>

        <HomeBalance
          isVisible={state.balanceVisible}
          value={state.balance}
          onToggle={() => dispatch('balanceVisible', !state.balanceVisible)}
        />

        <View style={styles.buttons}>
          {buttons.map((button, index) => (
            <HomeButton
              key={index}
              {...button}
              onPress={() => {
                if (button.href) {
                  navigation.navigate(button.href as keyof MainStackParamList);
                }
              }}
            />
          ))}
        </View>
      </View>

      <HomeTransactions data={[]} />

      <Dialog {...home.dialog} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
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
