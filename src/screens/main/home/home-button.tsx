import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, IconName, Text } from '@components';
import { Theme } from '@theme';

export interface HomeButtonProps {
  title: string;
  icon: IconName;
  onPress: () => void;
}

export const HomeButton = (props: HomeButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      style={styles.button}
    >
      <View style={styles.buttonIcon}>
        <Icon name={props.icon} size={32} color="primary" />
      </View>

      <Text align="center" variant="footnote">
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    maxWidth: '30%',
    padding: Theme.sizes.xs,
    gap: Theme.sizes.xs,
  },
  buttonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#FFFFFF40',
    borderRadius: Theme.sizes.md,
    borderColor: Theme.colors.border,
    padding: Theme.sizes.md,
    width: '100%',
    aspectRatio: 1 / 1,
  },
});
