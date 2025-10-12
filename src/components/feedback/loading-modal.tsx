import { ActivityIndicator, Image, Modal, View } from 'react-native';
import { LogoLight } from '@assets';
import { useTheme } from '@hooks';

export interface LoadingModalProps {
  visible?: boolean;
}

export const LoadingModal = (props: LoadingModalProps) => {
  const theme = useTheme();
  return (
    <Modal transparent visible={props.visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.primary,
        }}
      >
        <Image
          source={LogoLight}
          resizeMode="contain"
          style={{ width: '80%', height: 80 }}
        />
        <ActivityIndicator color={theme.colors.primarySurface} size="large" />
      </View>
    </Modal>
  );
};
