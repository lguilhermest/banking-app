import { IconProps as PhosphorIconProps } from 'phosphor-react-native';
import { ColorVariant } from '@theme';
import icons from './lib';

export type IconName = keyof typeof icons;

export interface IconProps extends Omit<PhosphorIconProps, 'color'> {
  name: IconName;
  color?: ColorVariant;
}
