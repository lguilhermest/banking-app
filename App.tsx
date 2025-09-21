import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigation } from './src/navigation/navigation';
import { AuthProvider } from '@context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
