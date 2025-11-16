import { ScreenHeaderProps } from './screen.header';
import { ViewStyle } from 'react-native';

export interface ScreenProps extends ScreenHeaderProps {
  children?: React.ReactNode;
  useSafeArea?: boolean;
  scrollable?: boolean;
  center?: boolean;
  style?: ViewStyle;
  scrollableStyle?: ViewStyle;
  headerShown?: boolean;
  safeContainerStyle?: ViewStyle;
  loading?: boolean;
  loadingAction?: boolean;
  footerComponent?: React.ReactNode;
}
