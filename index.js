/**
 * @format
 */

if (__DEV__) {
  require('./ReactotronConfig');
}

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AuthProvider } from '@context';

function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => Root);
