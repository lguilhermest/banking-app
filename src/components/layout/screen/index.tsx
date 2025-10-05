import {
  ActivityIndicator,
  Modal,
  ScrollView,
  ScrollViewProps,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader, ScreenHeaderProps } from './screen.header';
import { StyleSheet } from 'react-native';
import { ThemeType } from '@theme';
import { useTheme } from '@hooks';
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
  loading?: boolean;
  actionLoading?: boolean;
}

export const Screen = ({
  useSafeArea = true,
  scrollable = true,
  headerShown = true,
  ...props
}: ScreenProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
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

      {props.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </View>
      ) : (
        <ContentWrapper {...contentWrapperProps}>
          {props.children}
        </ContentWrapper>
      )}

      {props.actionLoading && (
        <Modal transparent visible>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <ActivityIndicator color={theme.colors.primary} size="small" />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    view: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flexGrow: 1,
      padding: theme.sizes.lg,
      gap: theme.sizes.lg,
      backgroundColor: theme.colors.background,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: theme.colors.foreground,
      padding: 12,
      borderRadius: 4,
    },
  });
