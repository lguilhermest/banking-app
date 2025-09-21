import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, LoginScreen, PasswordRecoveryScreen } from '../screens';
import { useIsAuthenticated } from '@context';
import { createStaticNavigation } from '@react-navigation/native';

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
      },
    },
  },
});

export const AppNavigation = createStaticNavigation(RootStack);
