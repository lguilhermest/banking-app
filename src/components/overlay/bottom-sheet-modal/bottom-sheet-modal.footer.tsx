import { Button, ButtonScheme, ButtonVariant } from '../../form';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@hooks';

export interface BottomSheetModalFooterProps {
  footerStyle?: ViewStyle;
  primaryActionLabel?: string;
  primaryActionScheme?: ButtonScheme;
  primaryActionVariant?: ButtonVariant;
  secondaryActionLabel?: string;
  secondaryActionScheme?: ButtonScheme;
  secondaryActionVariant?: ButtonVariant;
  onPrimaryActionPress?: () => void;
  onSecondaryActionPress?: () => void;
  primaryActionLoading?: boolean;
  secondaryActionLoading?: boolean;
}

export const BottomSheetModalFooter = (props: BottomSheetModalFooterProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: theme.sizes.lg,
          marginTop: theme.sizes.lg,
          alignItems: 'center',
        },
        props.footerStyle,
      ]}
    >
      {!!props.secondaryActionLabel && (
        <Button
          title={props.secondaryActionLabel}
          onPress={props.onSecondaryActionPress}
          scheme={props.secondaryActionScheme || 'secondary'}
          variant={props.secondaryActionVariant}
          loading={props.secondaryActionLoading}
          style={{ flex: 1, width: 'auto' }}
          disabled={props.primaryActionLoading}
        />
      )}
      {!!props.primaryActionLabel && (
        <Button
          title={props.primaryActionLabel}
          onPress={props.onPrimaryActionPress}
          scheme={props.primaryActionScheme}
          variant={props.primaryActionVariant || 'solid'}
          loading={props.primaryActionLoading}
          style={{ flex: 1, width: 'auto' }}
          disabled={props.secondaryActionLoading}
        />
      )}
    </View>
  );
};
