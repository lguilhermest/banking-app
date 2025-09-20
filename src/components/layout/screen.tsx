import React from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps {
  children?: React.ReactNode;
  useSafeArea?: boolean;
  scrollable?: boolean;
  center?: boolean;
  contentContainerStyle?: ViewStyle;
  scrollableStyle?: ViewStyle;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  useSafeArea = true,
  scrollable = true,
  ...props
}) => {
  const containerStyle: ViewStyle[] = [styles.container];
  const SafeContainer = useSafeArea ? SafeAreaView : React.Fragment;

  if (props.center) {
    containerStyle.push(styles.center);
  }

  return (
    <SafeContainer style={{ flex: 1 }}>
      {scrollable ? (
        <ScrollView
          contentContainerStyle={containerStyle}
          style={[{ flex: 1 }, props.scrollableStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={containerStyle}>{children}</View>
      )}
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
