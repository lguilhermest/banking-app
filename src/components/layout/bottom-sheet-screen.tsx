import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useKeyboardHeight, useTheme } from '@hooks';
import { useEffect, useRef } from 'react';

interface BottomSheetScreenProps {
  children?: React.ReactNode;
  getBottomSheetRef?: (ref: BottomSheetModal) => void;
  dismissable?: boolean;
}

export const BottomSheetScreen = ({ dismissable = true, ...props }: BottomSheetScreenProps) => {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const keyboardHeight = useKeyboardHeight();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setTimeout(() => {
      bottomSheetRef.current?.present();
    }, 100);
  }, []);

  useEffect(() => {
    if (props.getBottomSheetRef && bottomSheetRef.current) {
      props.getBottomSheetRef(bottomSheetRef.current);
    }
  }, [bottomSheetRef]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        backgroundStyle={{
          backgroundColor: theme.colors.background,
          borderRadius: 20,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.primary,
        }}
        ref={bottomSheetRef}
        enablePanDownToClose
        backdropComponent={() => (
          <Pressable
            onPress={() => bottomSheetRef.current?.close()}
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            disabled={!dismissable}
          />
        )}
        onDismiss={() => {
          navigation.goBack();
        }}
        animationConfigs={{
          mass: 0.5,
        }}
        maxDynamicContentSize={
          Dimensions.get('window').height - insets.top - insets.bottom
        }
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            paddingBottom: insets.bottom + keyboardHeight,
          }}
        >
          <View style={{ padding: theme.sizes.lg, gap: theme.sizes.lg }}>
            {props.children}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
