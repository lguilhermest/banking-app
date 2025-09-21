import {
  StyleSheet,
  Switch,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, IconName, Text } from '@components';
import { Theme } from '@theme';

export interface SettingsButtonProps {
  title: string;
  icon: IconName;
  onPress?: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: () => void;
}

export const SettingsButton = (props: SettingsButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      style={styles.container}
    >
      <Icon name={props.icon} />
      <View style={{ flex: 1 }}>
        <Text>{props.title}</Text>
      </View>
      {props.toggle && (
        <Switch
          value={props.toggleValue}
          onValueChange={props.onToggle}
          trackColor={{
            true: Theme.colors.primary,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.sizes.sm,
    gap: 10,
  },
});
