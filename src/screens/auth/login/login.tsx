import { useNavigation } from '@react-navigation/native';
import { Button, InputField, Screen } from '@components';
import { Image, StyleSheet, View } from 'react-native';
import { AuthNavigation } from '@navigation';
import { useLogin } from './login.hook';
import { Logo } from '@assets';
import { Theme } from '@theme';

export function LoginScreen() {
  const navigation = useNavigation<AuthNavigation<'Login'>>();
  const login = useLogin();

  return (
    <Screen center useSafeArea={false} headerShown={false}>
      <Image source={Logo} resizeMode="contain" style={styles.logo} />

      <InputField
        label="Email"
        autoCapitalize="none"
        {...login.form.control.email}
      />

      <View style={{ width: '100%', gap: Theme.sizes.sm }}>
        <InputField
          label="Password"
          secureTextEntry
          {...login.form.control.password}
        />
        <Button
          title="Esqueceu sua senha?"
          variant="link"
          onPress={() => navigation.navigate('PasswordRecovery')}
          style={{ alignSelf: 'flex-end' }}
        />
      </View>

      <Button
        title="Login"
        onPress={login.form.submit}
        loading={login.loading}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: '100%',
  },
});
