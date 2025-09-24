/**
 * @format
 */

if (__DEV__) {
  require('./ReactotronConfig');
}

import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';
import { AuthProvider, DialogProvider } from '@context';
import App from './App';

function Root() {
  return (
    <DialogProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </DialogProvider>
  );
}

AppRegistry.registerComponent(appName, () => Root);
