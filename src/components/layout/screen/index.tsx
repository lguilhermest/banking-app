import { ScrollView, ScrollViewProps, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader, ScreenHeaderProps } from './screen.header';
import { StyleSheet } from 'react-native';
import { Theme } from '@theme';
import React from 'react';

interface ScreenProps extends ScreenHeaderProps {
  children?: React.ReactNode;
  useSafeArea?: boolean;
  scrollable?: boolean;
  center?: boolean;
  style?: ViewStyle;
  scrollableStyle?: ViewStyle;
  headerShown?: boolean;
  safeContainerStyle?: ViewStyle;
}

export const Screen = ({
  useSafeArea = true,
  scrollable = true,
  headerShown = true,
  ...props
}: ScreenProps) => {
  const viewStyle: ViewStyle[] = [styles.view];

  const ContentWrapper = scrollable ? ScrollView : View;
  const contentWrapperProps: ScrollViewProps = {};

  if (scrollable) {
    contentWrapperProps.style = [props.scrollableStyle];
    contentWrapperProps.contentContainerStyle = [styles.container, props.style];

    if (props.center) {
      contentWrapperProps.contentContainerStyle.push(styles.center);
    }
  } else {
    contentWrapperProps.style = [styles.container];

    if (props.style) {
      contentWrapperProps.style.push(props.style);
    }

    if (props.center) {
      contentWrapperProps.style.push(styles.center);
    }
  }

  if (useSafeArea) {
    viewStyle.push({
      paddingTop: !headerShown ? useSafeAreaInsets().top : 0,
      paddingBottom: useSafeAreaInsets().bottom,
    });
  }

  return (
    <View style={[viewStyle, props.safeContainerStyle]}>
      {headerShown && <ScreenHeader {...props} />}

      <ContentWrapper {...contentWrapperProps}>{props.children}</ContentWrapper>
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
    padding: Theme.sizes.lg,
    gap: Theme.sizes.lg,
    backgroundColor: Theme.colors.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
