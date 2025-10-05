import { View } from 'react-native';
import { Text } from '@components';

export const ReceiptItem = (props: { label: string; value?: string }) => {
  if (!props.value) return null;

  return (
    <View style={{ gap: 4 }}>
      <Text color="textSecondary" variant="footnote">
        {props.label}
      </Text>
      <Text color="text" variant="body">
        {props.value}
      </Text>
    </View>
  );
};
