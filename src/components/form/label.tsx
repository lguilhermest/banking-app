import { Text } from './text';

interface LabelProps {
  text?: string;
}

export const Label: React.FC<LabelProps> = props => {
  return <Text variant="footnote">{props.text}</Text>;
};
