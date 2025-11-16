import { IconProps as PhosphorIconProps } from 'phosphor-react-native';
import { IconProps } from './icon.types';
import { useTheme } from '@hooks';
import icons from './lib';

export const Icon = ({
  name,
  size = 24,
  color = 'text',
  weight = 'regular',
  ...props
}: IconProps) => {
  const theme = useTheme();
  const Component = icons[name] as React.ComponentType<PhosphorIconProps>;
  return (
    <Component
      weight={weight}
      {...props}
      color={theme.colors[color]}
      size={size}
    />
  );
};
