import { IconProps as PhosphorIconProps } from 'phosphor-react-native';
import icons from './lib';

export type IconName = keyof typeof icons;

export interface IconProps extends PhosphorIconProps {
  name: IconName;
}
