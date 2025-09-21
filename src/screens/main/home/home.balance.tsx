import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, Text } from '@components';
import { formatCurrency } from '@utils';
import { Theme } from '@theme';

export const HomeBalance = (
  props: {
    isVisible: boolean;
    value: number;
    onToggle: () => void;
  },
) => {
  return (
    <View style={styles.container}>
      <View>
        <Text variant="caption">Meu Saldo</Text>
        <Text variant="heading">
          {props.isVisible ? formatCurrency(props.value) : '••••••••'}
        </Text>
      </View>

      <Pressable onPress={props.onToggle}>
        <Icon name={props.isVisible ? 'eye' : 'eye_slash'} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 12,
    padding: 16,
  },
});
