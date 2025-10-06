import {
  HomeScreen,
  LoginScreen,
  PasswordRecoveryScreen,
  PixConfirmScreen,
  PixQrcodeScreen,
  ReceiptScreen,
  SettingsScreen,
} from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { useIsAuthenticated } from '@hooks';

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  groups: {
    auth: {
      if: () => !useIsAuthenticated(),
      screens: {
        Login: { screen: LoginScreen },
        PasswordRecovery: { screen: PasswordRecoveryScreen },
      },
    },
    main: {
      if: () => useIsAuthenticated(),
      screens: {
        Home: HomeScreen,
        Settings: SettingsScreen,
        Receipt: ReceiptScreen,
        PixQrcode: PixQrcodeScreen,
        PixConfirm: PixConfirmScreen,
      },
    },
  },
});

export const AppNavigation = createStaticNavigation(RootStack);
