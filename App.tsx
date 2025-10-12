import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigation } from './src/navigation/navigation';
import { useEffect, useState } from 'react';
import { LoadingModal } from '@components';
import { useAuth } from '@hooks';
import './src/i18n';

export default function App() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(auth.state.isLoading);
    }
  }, [auth.state.isLoading]);

  return (
    <SafeAreaProvider>
      <LoadingModal visible={isLoading} />
      <AppNavigation />
    </SafeAreaProvider>
  );
}
