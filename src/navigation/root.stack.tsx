import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, PasswordRecoveryScreen } from '../screens';
import { RootStackParamList } from '@types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordRecovery"
        component={PasswordRecoveryScreen}
        options={{ title: 'Recuperação de senha' }}
      />
    </Stack.Navigator>
  );
}
