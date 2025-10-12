import {
  Animated,
  Easing,
  Pressable,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { formatCurrency, onlyNumbers } from '@utils';
import { useTranslation } from 'react-i18next';
import { ColorVariant } from '@theme';
import { Text } from '@components';
import { useAuth } from '@hooks';

interface InputCurrencyProps {
  value?: number;
  editable?: boolean;
  autoFocus?: boolean;
  onChange?: (value: number) => void;
  style?: ViewStyle;
  hideBalance?: boolean;
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
  const [showCursor, setShowCursor] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const isInsufficient = value > state.balance;
  const formatted = formatCurrency(value, 2, false);

  useEffect(() => {
    if (typeof props.value === 'number' && props.value !== value) {
      setValue(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    if (props.onChange && value !== props.value) {
      props.onChange(value);
    }
  }, [value]);

  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current?.focus();
    }
  }, [props.autoFocus]);

  // animação de shake
  useEffect(() => {
    if (isInsufficient) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 5,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -5,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 4,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -4,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isInsufficient]);

  useEffect(() => {
    if (!isFocused) return setShowCursor(false);
    const t = setInterval(() => setShowCursor(p => !p), 500);
    return () => clearInterval(t);
  }, [isFocused]);

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
          <Text
            variant="body"
            weight="600"
            color={isInsufficient ? 'danger' : 'text'}
          >
            R${' '}
          </Text>

          {formatted.split('').map((c, i) =>
            i === formatted.length - 1 ? (
              <AnimatedDigit
                key={i}
                char={c}
                color={isInsufficient ? 'danger' : 'text'}
              />
            ) : (
              <Text
                key={i}
                variant="currency"
                color={isInsufficient ? 'danger' : 'text'}
              >
                {c}
              </Text>
            ),
          )}

          <View
            style={{
              width: 2,
              height: 28,
              backgroundColor: showCursor ? 'blue' : 'transparent',
              marginLeft: 1,
            }}
          />
        </Pressable>
      </Animated.View>
      {isInsufficient ? (
        <Text color="danger" variant="footnote">
          {t('common.insufficient_balance')}
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

const AnimatedDigit = (props: { char: string; color: ColorVariant }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [props.char]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });

  const opacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={{ transform: [{ translateY }], opacity }}>
      <Text variant="currency" color={props.color}>
        {props.char}
      </Text>
    </Animated.View>
  );
};
