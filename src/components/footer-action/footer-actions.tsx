import { FooterActionsProps } from './footer-actions.types';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { Button } from '../form';

export const FooterActions = (props: FooterActionsProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: theme.sizes.lg,
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
