import { Logo } from '@assets';
import { Button, InputField, Screen } from '@components';
import { Image, StyleSheet } from 'react-native';
import { usePasswordRecovery } from './password-recovery.hook';

export function PasswordRecoveryScreen() {
  const passwordRecovery = usePasswordRecovery();

  return (
    <Screen center title="Recuperar senha">
      <Image source={Logo} resizeMode="contain" style={styles.logo} />

      <InputField label="Email" {...passwordRecovery.form.control.email} />

      <Button title="Recuperar senha" onPress={passwordRecovery.form.submit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 40,
    width: '100%',
  },
});
