import {
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { FooterActions, FooterActionsProps } from '../../footer-action';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalBaseProps } from '../modal';
import { useEffect, useRef } from 'react';
import { Text } from '../../form';
import { useTheme } from '@hooks';

export interface BottomSheetModalBaseProps extends ModalBaseProps {
  onDismiss?: () => void;
}
export interface BottomSheetModalProps
  extends BottomSheetModalBaseProps,
    FooterActionsProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  primaryActionCancelable?: boolean;
  secondaryActionCancelable?: boolean;
  dismissable?: boolean;
}

export const BottomSheetModal = ({
  dismissable = true,
  ...props
}: BottomSheetModalProps) => {
  const bottomSheetRef = useRef<GorhomBottomSheetModal>(null);
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (props.visible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [props.visible]);

  function handleDismiss() {
    bottomSheetRef.current?.dismiss();
  }

  return (
    <GorhomBottomSheetModal
      ref={bottomSheetRef}
      animationConfigs={{
        mass: 0.5,
      }}
      backgroundStyle={{
        backgroundColor: theme.colors.foreground,
        borderRadius: theme.sizes.borderRadius,
      }}
      enablePanDownToClose
      onDismiss={props.onDismiss}
      backdropComponent={() => (
        <Pressable
          onPress={handleDismiss}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: 'rgba(0,0,0,0.5)' },
          ]}
          disabled={
            !dismissable ||
            props.primaryActionLoading ||
            props.secondaryActionLoading
          }
        />
      )}
    >
      <BottomSheetScrollView
        contentContainerStyle={[
          {
            paddingBottom: insets.bottom,
          },
          props.containerStyle,
        ]}
      >
        <View style={[{ padding: theme.sizes.lg }, props.style]}>
          {(props.title || props.subtitle) && (
            <View style={{ marginBottom: theme.sizes.lg, gap: theme.sizes.sm }}>
              {props.title && (
                <Text align="center" variant="subheading">
                  {props.title}
                </Text>
              )}
              {props.subtitle && (
                <Text align="center" variant="subheading" color="textSecondary">
                  {props.subtitle}
                </Text>
              )}
            </View>
          )}

          {props.children}

          {(!!props.primaryActionLabel || !!props.secondaryActionLabel) && (
            <FooterActions
              primaryActionLabel={props.primaryActionLabel}
              secondaryActionLabel={props.secondaryActionLabel}
              primaryActionScheme={props.primaryActionScheme}
              primaryActionVariant={props.primaryActionVariant}
              secondaryActionScheme={props.secondaryActionScheme}
              secondaryActionVariant={props.secondaryActionVariant}
              primaryActionLoading={props.primaryActionLoading}
              secondaryActionLoading={props.secondaryActionLoading}
              footerStyle={[{ marginTop: theme.sizes.lg }, props.footerStyle]}
              onPrimaryActionPress={
                props.primaryActionCancelable
                  ? handleDismiss
                  : props.onPrimaryActionPress
              }
              onSecondaryActionPress={
                props.secondaryActionCancelable
                  ? handleDismiss
                  : props.onSecondaryActionPress
              }
            />
          )}
        </View>
      </BottomSheetScrollView>
    </GorhomBottomSheetModal>
  );
};
