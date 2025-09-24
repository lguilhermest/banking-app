import { useNavigation } from '@react-navigation/native';
import { Button, InputField, Screen } from '@components';
import { Image, StyleSheet, View } from 'react-native';
import { AuthNavigation } from '@navigation';
import { useLogin } from './login.hook';
import { Logo } from '@assets';
import { Theme } from '@theme';
import { useTranslation } from 'react-i18next';

export function LoginScreen() {
  const navigation = useNavigation<AuthNavigation<'Login'>>();
  const login = useLogin();
  const { t } = useTranslation();

  return (
    <Screen center useSafeArea={false} headerShown={false}>
      <Image source={Logo} resizeMode="contain" style={styles.logo} />

      <InputField
        label={t('auth.login.email')}
        autoCapitalize="none"
        {...login.form.control.email}
      />

      <View style={{ width: '100%', gap: Theme.sizes.sm }}>
        <InputField
          label={t('auth.login.password')}
          secureTextEntry
          {...login.form.control.password}
        />
        <Button
          title={t('auth.login.forgot')}
          variant="link"
          onPress={() => navigation.navigate('PasswordRecovery')}
          style={{ alignSelf: 'flex-end' }}
        />
      </View>

      <Button
        title={t('auth.login.submit')}
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
