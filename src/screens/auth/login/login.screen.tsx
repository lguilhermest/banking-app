import { Logo } from '@assets';
import { Button, InputField, Screen } from '@components';
import { Image, StyleSheet } from 'react-native';
import { useLogin } from './login.hook';
import { RootStackScreenProps } from '@types';

export function LoginScreen(props: RootStackScreenProps<'Login'>) {
  const login = useLogin();

  return (
    <Screen center>
      <Image source={Logo} resizeMode="contain" style={styles.logo} />

      <InputField
        label="Email"
        autoCapitalize="none"
        {...login.form.control.email}
      />

      <InputField label="Password" {...login.form.control.password} />

      <Button title="Login" onPress={login.form.submit} />

      <Button
        title="Esqueceu sua senha?"
        variant="link"
        onPress={() => props.navigation.navigate('PasswordRecovery')}
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
