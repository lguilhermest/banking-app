import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Modal, View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboardHeight, useTheme } from '@hooks';
import { useRef, useState, useEffect } from 'react';
import { Button } from '../button';
import { ThemeType } from '@theme';
import { Text } from '../text';

export const ShortPassword = () => {
  const [value, setValue] = useState('');
  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme();
  const styles = createStyles(theme);

  const dotProgress = [0, 1, 2, 3].map(() => useSharedValue(0));

  useEffect(() => {
    if (value.length > 4) setValue(value.slice(0, 4));

    dotProgress.forEach((p, i) => {
      const filled = !!value[i];
      p.value = withTiming(filled ? 1 : 0, { duration: 150 });
    });
  }, [value]);

  const animatedStyles = dotProgress.map(p =>
    useAnimatedStyle(() => {
      const size = 6 + (16 - 6) * p.value;
      const radius = size / 2;
      return {
        width: size,
        height: size,
        borderRadius: radius,
      };
    }),
  );

  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View
          style={[
            styles.card,
            {
              paddingBottom:
                keyboardHeight > 0 ? keyboardHeight + 20 : insets.bottom + 10,
            },
          ]}
        >
          <Text align="center" variant="subheading">
            Digite sua senha de 4 dígitos
          </Text>
          <View style={styles.dotsContainer}>
            {[0, 1, 2, 3].map(i => (
              <Animated.View key={i} style={[styles.dot, animatedStyles[i]]} />
            ))}
          </View>

          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={setValue}
            keyboardType="number-pad"
            maxLength={4}
            style={styles.hiddenInput}
            autoFocus
            submitBehavior="newline"
            selectTextOnFocus={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    card: {
      gap: theme.sizes.lg,
      backgroundColor: theme.colors.foreground,
      borderRadius: theme.sizes.borderRadius,
      padding: theme.sizes.lg,
      width: '100%',
      minHeight: '50%',
      alignItems: 'center',
    },
    dotsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.sizes.md,
      minHeight: 40,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 6,
      backgroundColor: theme.colors.textSecondary,
    },
    hiddenInput: {
      position: 'absolute',
      opacity: 0.1,
      // backgroundColor: 'red',
      width: '100%',
      top: 0,
      bottom: 0,
      zIndex: 1000,
    },
  });
