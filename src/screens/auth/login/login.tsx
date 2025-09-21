import { useNavigation } from '@react-navigation/native';
import { Button, InputField, Screen } from '@components';
import { Image, StyleSheet } from 'react-native';
import { AuthNavigation } from '@navigation';
import { useLogin } from './login.hook';
import { Logo } from '@assets';

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

      <InputField
        label="Password"
        secureTextEntry
        {...login.form.control.password}
      />

      <Button
        title="Login"
        onPress={login.form.submit}
        loading={login.loading}
      />

      <Button
        title="Esqueceu sua senha?"
        variant="link"
        onPress={() => navigation.navigate('PasswordRecovery')}
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
