import { Text } from './text';

interface LabelProps {
  text?: string;
}

export const Label: React.FC<LabelProps> = props => {
  return <Text variant="caption">{props.text}</Text>;
};
