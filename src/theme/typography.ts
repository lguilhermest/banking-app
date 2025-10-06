import { StyleSheet, TextStyle } from 'react-native';

export type TypographyVariant = keyof typeof typography;

const BASE_FONT_SIZE = 16;
const LINE_HEIGHT_MULTIPLIER = 1.2;

function getTextStyle(
  size: number,
  weight: TextStyle['fontWeight'] = '400',
  props: Partial<TextStyle> = {},
): TextStyle {
  return {
    ...props,
    fontFamily: 'ui-rounded',
    fontSize: BASE_FONT_SIZE * size,
    lineHeight: BASE_FONT_SIZE * size * LINE_HEIGHT_MULTIPLIER,
    fontWeight: weight,
  };
}

export const typography = StyleSheet.create({
  body: getTextStyle(1),
  headerTitle: getTextStyle(1.125, '600', { textAlign: 'center' }), // 18
  currency: getTextStyle(2.5, '700'), // 40,
  display: getTextStyle(2, '700'), // 32,
  heading: getTextStyle(1.375, '600'), // 22,
  subheading: getTextStyle(1.125, '500'), // 18,
  footnote: getTextStyle(0.875), // 14  ,
  caption: getTextStyle(0.75), // 12,
  overline: getTextStyle(0.625, '500', { textTransform: 'uppercase' }), // 10,
  button: getTextStyle(0.875, '600'), // 14,
} as const);
