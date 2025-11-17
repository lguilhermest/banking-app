import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Icon, IconName } from '../../icon';
import { Text } from '../../form';
import { Logo } from '@assets';
import { Theme } from '@theme';

export interface ScreenHeaderProps {
  canGoBack?: boolean;
  title?: string;
  headerType?: 'default' | 'logo';
  rightIcon?: IconName;
  onRightIconPress?: () => void;
}
export const ScreenHeader = ({
  headerType = 'default',
  ...props
}: ScreenHeaderProps) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();

  navigation.canGoBack();

  const HeaderDefault = () => {
    return (
      (props.title || props.canGoBack) && (
        <View style={styles.header}>
          {navigation.canGoBack() && (
            <TouchableHighlight
              style={styles.backButton}
              onPress={navigation.goBack}
              underlayColor="transparent"
            >
              <View>
                <Icon
                  name="chevron_left"
                  color="primarySurface"
                />
              </View>
            </TouchableHighlight>
          )}

          {props.title && (
            <Text variant="headerTitle" align="center" color="primarySurface">
              {props.title}
            </Text>
          )}

          {props.rightIcon && (
            <TouchableHighlight
              style={styles.rightButton}
              onPress={props.onRightIconPress}
              underlayColor="transparent"
            >
              <View>
                <Icon
                  name={props.rightIcon}
                  color="primarySurface"
                />
              </View>
            </TouchableHighlight>
          )}
        </View>
      )
    );
  };

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      {headerType === 'logo' ? (
        <View style={styles.header}>
          <Image
            source={Logo}
            resizeMode="contain"
            style={{ height: 40, width: 'auto' }}
          />
        </View>
      ) : (
        <HeaderDefault />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.primary,
  },
  header: {
    position: 'relative',
    minHeight: 48,
    justifyContent: 'center',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    paddingHorizontal: 10,
    left: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  rightButton: {
    position: 'absolute',
    paddingHorizontal: 10,
    right: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
