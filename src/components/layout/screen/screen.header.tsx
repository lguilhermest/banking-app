import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../../icon';
import { Text } from '../../form';
import { Logo } from '@assets';
import { Theme } from '@theme';

export interface ScreenHeaderProps {
  canGoBack?: boolean;
  title?: string;
  headerType?: 'default' | 'logo';
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
      props.title && (
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
                  color={Theme.colors.backgroundSurface}
                />
              </View>
            </TouchableHighlight>
          )}

          {props.title && (
            <Text variant="headerTitle" align="center">
              {props.title}
            </Text>
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
    left: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
