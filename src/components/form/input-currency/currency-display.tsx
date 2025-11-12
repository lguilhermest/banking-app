import { Animated, Easing, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { ColorVariant } from '@theme';
import { Text } from '../text';

export const CurrencyDisplay = (props: {
  formatted: string;
  hasError: boolean;
  showCursor: boolean;
}) => {
  return (
    <>
      <Text
        variant="body"
        weight="600"
        color={props.hasError ? 'danger' : 'text'}
      >
        R${' '}
      </Text>

      {props.formatted.split('').map((c, i) =>
        i === props.formatted.length - 1 ? (
          <AnimatedDigit
            key={i}
            char={c}
            color={props.hasError ? 'danger' : 'text'}
          />
        ) : (
          <Text
            key={i}
            variant="currency"
            color={props.hasError ? 'danger' : 'text'}
          >
            {c}
          </Text>
        ),
      )}

      <View
        style={{
          width: 2,
          height: 28,
          backgroundColor: props.showCursor ? 'blue' : 'transparent',
          marginLeft: 1,
        }}
      />
    </>
  );
};

const AnimatedDigit = ({
  char,
  color,
}: {
  char: string;
  color: ColorVariant;
}) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [char]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <Animated.View style={{ transform: [{ translateY }], opacity }}>
      <Text variant="currency" color={color}>
        {char}
      </Text>
    </Animated.View>
  );
};
