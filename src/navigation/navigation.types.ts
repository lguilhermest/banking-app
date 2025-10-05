import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  PasswordRecovery: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Settings: undefined;
  Receipt: { transactionId: number };
};

export type ParamListGroups = {
  auth: AuthStackParamList;
  main: MainStackParamList;
};

export type AuthNavigation<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

export type MainNavigation<T extends keyof MainStackParamList> =
  NativeStackNavigationProp<MainStackParamList, T>;
