import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PixPaymentProps } from '@types';

export type AuthStackParamList = {
  Login: undefined;
  PasswordRecovery: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Settings: undefined;
  Receipt: { transactionId: number };
  PixKeys: undefined;
  PixKeyPayment: undefined;
  PixQrcodePayment: undefined;
  PixConfirmPayment: PixPaymentProps;
};

export type ModalStackParamList = {};

export type RootStackParamList = AuthStackParamList &
  MainStackParamList &
  ModalStackParamList;

export type AuthNavigation<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

export type MainNavigation<T extends keyof MainStackParamList> =
  NativeStackNavigationProp<MainStackParamList, T>;

export type RootNavigation<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;
