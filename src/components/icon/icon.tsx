import { IconProps } from './icon.types';
import icons from './lib';

export const Icon = ({
  name,
  size = 24,
  weight = 'regular',
  ...props
}: IconProps) => {
  const Component = icons[name];
  return <Component weight={weight} {...props} size={size} />;
};
