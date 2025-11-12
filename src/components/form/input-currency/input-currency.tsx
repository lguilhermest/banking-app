import { Animated, Pressable, TextInput, View, ViewStyle } from 'react-native';
import { useBlinkingCursor, useShakeAnimation } from './input-currency.hook';
import { CurrencyDisplay } from './currency-display';
import { formatCurrency, onlyNumbers } from '@utils';
import { useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text } from '@components';
import { useAuth } from '@hooks';

interface InputCurrencyProps {
  value?: number;
  editable?: boolean;
  autoFocus?: boolean;
  onChangeValue?: (value: number) => void;
  style?: ViewStyle;
  hideBalance?: boolean;
  error?: string;
  form?: UseFormReturn<any>;
  field?: string;
}

export const InputCurrency = ({
  editable = true,
  ...props
}: InputCurrencyProps) => {
  const { state } = useAuth();
  const { t } = useTranslation();
  const inputRef = useRef<TextInput>(null);
  const [value, setValue] = useState(props.value ?? 0);
  const [isFocused, setIsFocused] = useState(false);
  const showCursor = useBlinkingCursor(isFocused);

  const hasError =
    value > state.balance ||
    !!props.error ||
    !!props.form?.formState.errors[props.field as string]?.message;

  const formatted = formatCurrency(value, 2, false);
  const shakeAnim = useShakeAnimation(!!hasError);

  useEffect(() => {
    if (typeof props.value === 'number' && props.value !== value) {
      setValue(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    if (props.onChangeValue && value !== props.value) {
      props.onChangeValue(value);
    }
    if (
      props.form &&
      props.field &&
      value !==
        (props.form.getValues(props.field as string) as unknown as number)
    ) {
      props.form.setValue(props.field as string, value as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [value]);

  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current?.focus();
    }
  }, [props.autoFocus]);

  return (
    <View style={[{ alignItems: 'center', gap: 8 }, props.style]}>
      <Animated.View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          transform: [{ translateX: shakeAnim }],
        }}
      >
        <TextInput
          ref={inputRef}
          keyboardType="numeric"
          onChangeText={(text: string) =>
            setValue(Number(onlyNumbers(text)) / 100)
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ height: 0, width: 0, opacity: 0 }}
          value={formatted}
          maxLength={10}
          editable={editable}
        />

        <Pressable
          onPress={() => inputRef.current?.focus()}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <CurrencyDisplay
            formatted={formatted}
            hasError={hasError}
            showCursor={showCursor}
          />
        </Pressable>
      </Animated.View>
      
      {hasError ? (
        <Text color="danger" variant="footnote">
          {props.error ||
            (props.form?.formState.errors[props.field as string]
              ?.message as string) ||
            t('common.insufficient_balance')}
        </Text>
      ) : (
        !props.hideBalance && (
          <Text variant="footnote" color="textSecondary">
            {t('common.balance')} {formatCurrency(state.balance)}
          </Text>
        )
      )}
    </View>
  );
};
