/**
 * @format
 */

if (__DEV__) {
  require('./ReactotronConfig');
}

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, DialogProvider } from '@context';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';
import App from './App';

function Root() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DialogProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DialogProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => Root);
