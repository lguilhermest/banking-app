import { StyleSheet, Text } from 'react-native';

interface LabelProps {
  text?: string;
}

export const Label: React.FC<LabelProps> = props => {
  return <Text style={styles.label}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});
