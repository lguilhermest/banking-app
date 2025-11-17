import {
  BottomSheetModal,
  BottomSheetModalBaseProps,
  Icon,
  Text,
} from '@components';
import { PIX_KEY_TYPE_ICONS, PIX_KEY_TYPES } from '@mappers';
import { TouchableHighlight, View } from 'react-native';
import { useAuth, useTheme } from '@hooks';
import { PixKeyType } from '@types';

export const PixKeyRegister = (
  props: BottomSheetModalBaseProps & { onSelect?: (type: PixKeyType) => void },
) => {
  const theme = useTheme();
  const auth = useAuth();
  const omitValue = [
    'DOCUMENT',
    auth.state.account.customer.type === 'LEGAL_PERSON' ? 'CPF' : 'CNPJ',
  ];

  return (
    <BottomSheetModal
      visible={props.visible}
      onDismiss={props.onDismiss}
      style={{ paddingHorizontal: 0 }}
    >
      {PIX_KEY_TYPES.filter(keyType => !omitValue.includes(keyType.value)).map(
        keyType => (
          <TouchableHighlight
            key={keyType.value}
            underlayColor={theme.colors.secondaryLight}
            onPress={() => {
              props.onDismiss?.();
              props.onSelect?.(keyType.value);
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: theme.sizes.lg,
                gap: theme.sizes.md,
              }}
            >
              <Icon name={PIX_KEY_TYPE_ICONS[keyType.value]} />
              <Text style={{ flex: 1 }}>{keyType.label}</Text>
              <Icon name="chevron_right" />
            </View>
          </TouchableHighlight>
        ),
      )}
    </BottomSheetModal>
  );
};
