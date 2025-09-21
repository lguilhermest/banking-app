import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInputProps, View } from 'react-native';
import { Icon } from '../../icon';
import { Theme } from '@theme';

export const PasswordField = (props: { children?: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      {React.Children.map(props.children, child => {
        if (!child) return null;
        return React.cloneElement(child as React.ReactElement<TextInputProps>, {
          ...(child as React.ReactElement<TextInputProps>).props,
          secureTextEntry: show ? false : true,
          inputMode: 'text',
          style: [
            { paddingRight: 40 },
            (child as React.ReactElement<TextInputProps>).props.style,
          ],
        });
      })}

      <Pressable onPress={() => setShow(!show)} style={styles.button}>
        <Icon
          name={show ? 'eye_slash' : 'eye'}
          size={20}
          color={Theme.colors.textSecondary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
