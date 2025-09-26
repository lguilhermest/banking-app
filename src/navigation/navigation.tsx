import {
  HomeScreen,
  LoginScreen,
  PasswordRecoveryScreen,
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
        Home: { screen: HomeScreen },
        Settings: { screen: SettingsScreen },
      },
    },
  },
});

export const AppNavigation = createStaticNavigation(RootStack);
