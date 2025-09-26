import { ActivityIndicator, Image, Modal, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigation } from './src/navigation/navigation';
import { LogoLight } from '@assets';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@hooks';
import { Theme } from '@theme';
import './src/i18n';

export default function App() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(isLoading) {
      setIsLoading(auth.state.isLoading);
    }
  }, [auth.state.isLoading]);

  const Loading = useCallback(() => {
    return (
      <Modal visible={isLoading}>
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
  }, [isLoading]);

  return (
    <SafeAreaProvider>
      <Loading />
      <AppNavigation />
    </SafeAreaProvider>
  );
}
