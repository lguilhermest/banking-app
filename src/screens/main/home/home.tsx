import { HomeButton, HomeButtonProps } from './home.button';
import { HomeTransactions } from './home.transactions';
import { Dialog, Screen, Text } from '@components';
import { StyleSheet, View } from 'react-native';
import { HomeBalance } from './home.balance';
import { useHome } from './home.hook';
import { useAuth } from '@context';
import { Theme } from '@theme';

const buttons: HomeButtonProps[] = [
  {
    title: 'Enviar Pix',
    icon: 'pix',
    onPress: () => {},
  },
  {
    title: 'Pagar QR Code',
    icon: 'qr_code',
    onPress: () => {},
  },
  {
    title: 'Minhas chaves',
    icon: 'key',
    onPress: () => {},
  },
  {
    title: 'Ajustes',
    icon: 'gear',
    onPress: () => {},
  },
];

export function HomeScreen() {
  const { state, dispatch } = useAuth();
  const home = useHome();

  return (
    <Screen
      safeContainerStyle={{
        paddingBottom: 0,
      }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View>
          <Text variant="caption" color="secondary">
            Olá,
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
            <HomeButton key={index} {...button} />
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
