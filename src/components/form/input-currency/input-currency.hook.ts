import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export function useShakeAnimation(trigger: boolean) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!trigger) return;
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: -5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [trigger]);
  return anim;
}

export function useBlinkingCursor(isFocused: boolean) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!isFocused) return setVisible(false);
    const interval = setInterval(() => setVisible(v => !v), 500);
    return () => clearInterval(interval);
  }, [isFocused]);
  return visible;
}
