import { StyleSheet } from 'react-native';
import { colors } from './colors';

const fontFamily = 'Inter';

export type TypographyVariant = keyof typeof typography;

export const typography = StyleSheet.create({
  display: {
    fontFamily,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 40,
  },
  heading: {
    fontFamily,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 32,
  },
  subheading: {
    fontFamily,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 28,
  },
  headerTitle: {
    fontFamily,
    color: colors.foregroundSurface,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  body: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  footnote: {
    fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontFamily,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  overline: {
    fontFamily,
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 14,
    textTransform: 'uppercase',
  },
  helper: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: colors.secondary,
  },
  error: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: colors.danger,
  },
});
