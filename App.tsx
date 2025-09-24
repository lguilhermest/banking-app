import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigation } from './src/navigation/navigation';
import { ActivityIndicator, Image, Modal, View } from 'react-native';
import { Theme } from '@theme';
import { LogoLight } from '@assets';
import { useAuth } from '@context';
import { useCallback } from 'react';
import './src/i18n';

export default function App() {
  const auth = useAuth();

  const Loading = useCallback(() => {
    return (
      <Modal visible={auth.state.isLoading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Theme.colors.primary,
          }}
        >
          <Image
            source={LogoLight}
            resizeMode="contain"
            style={{ width: '80%', height: 80 }}
          />
          <ActivityIndicator color={Theme.colors.primarySurface} size="large" />
        </View>
      </Modal>
    );
  }, [auth.state.isLoading]);

  return (
    <SafeAreaProvider>
      <Loading />
      <AppNavigation />
    </SafeAreaProvider>
  );
}
