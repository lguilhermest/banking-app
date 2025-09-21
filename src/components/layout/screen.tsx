import { useNavigation } from '@react-navigation/native';
import { Theme } from '@theme';
import React from 'react';
import {
  ScrollView,
  ScrollViewProps,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenProps {
  children?: React.ReactNode;
  useSafeArea?: boolean;
  scrollable?: boolean;
  center?: boolean;
  style?: ViewStyle;
  scrollableStyle?: ViewStyle;
  showHeader?: boolean;
  headerTitle?: string;
}

export const Screen: React.FC<ScreenProps> = ({
  useSafeArea = true,
  scrollable = true,
  ...props
}) => {
  const navigation = useNavigation();
  const viewStyle: ViewStyle[] = [styles.view];
  const headerStyle: ViewStyle[] = [styles.headerContainer];

  const scrollViewProps: ScrollViewProps = {};
  const ScrollViewWrapper = scrollable ? ScrollView : React.Fragment;

  if (scrollable) {
    scrollViewProps.style = [props.scrollableStyle];
    scrollViewProps.contentContainerStyle = [styles.container, props.style];

    if (props.center) {
      scrollViewProps.contentContainerStyle.push(styles.center);
    }
  } else {
    viewStyle.push(styles.container);
  }

  if (useSafeArea && !props.showHeader) {
    viewStyle.push(useSafeAreaInsets());
  }

  if (props.showHeader) {
    headerStyle.push({
      paddingTop: useSafeAreaInsets().top,
    });
  }

  return (
    <View style={viewStyle}>
      {props.showHeader && (
        <View style={headerStyle}>
          <View style={styles.header}>
            <TouchableHighlight
              style={styles.headerBackButton}
              onPress={navigation.goBack}
              underlayColor="transparent"
            >
              <View style={styles.headerBackButtonIcon} />
            </TouchableHighlight>
            <Text style={styles.headerText}>{props.headerTitle}</Text>
          </View>
        </View>
      )}

      <ScrollViewWrapper {...scrollViewProps}>
        {props.children}
      </ScrollViewWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    backgroundColor: Theme.colors.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: Theme.colors.foreground,
  },
  header: {
    position: 'relative',
    minHeight: 48,
    justifyContent: 'center',
    width: '100%',
  },
  headerBackButton: {
    position: 'absolute',
    paddingHorizontal: 20,
    left: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerBackButtonIcon: {
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    transform: [{ rotate: '45deg' }],
    borderColor: Theme.colors.text,
    backgroundColor: Theme.colors.foreground,
    width: 12,
    height: 12,
    zIndex: 1,
  },
  headerText: {
    color: Theme.colors.foregroundSurface,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
