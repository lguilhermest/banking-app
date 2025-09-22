import { Text } from './text';

interface HelperProps {
  text?: string;
  error?: boolean;
  errorText?: string;
}

export const Helper: React.FC<HelperProps> = props => {
  if (!props.text && !props.errorText) {
    return null;
  }

  return (
    <Text variant={'caption'} color={props.error ? 'danger' : 'secondary'}>
      {props.errorText || props.text}
    </Text>
  );
};
