import { ButtonScheme, ButtonStyles, ButtonVariant } from './button.types';
import { StyleSheet } from 'react-native';
import { ThemeType } from '@theme';

const outline: ButtonStyles = theme => ({
  primary: {
    container: {
      borderColor: theme.colors.primary,
    },
    highlight: theme.colors.primaryLight,
    text: {
      color: theme.colors.primary,
    },
  },
  secondary: {
    container: {
      borderColor: theme.colors.secondary,
    },
    highlight: theme.colors.secondaryLight,
    text: {
      color: theme.colors.secondary,
    },
  },
  danger: {
    container: {
      borderColor: theme.colors.danger,
    },
    highlight: theme.colors.dangerLight,
    text: {
      color: theme.colors.danger,
    },
  },
});

const solid: ButtonStyles = theme => ({
  primary: {
    container: {
      backgroundColor: theme.colors.primary,
    },
    highlight: theme.colors.primaryDark,
    text: {
      color: theme.colors.primarySurface,
    },
  },
  secondary: {
    container: {
      backgroundColor: theme.colors.secondaryLight,
    },
    highlight: theme.colors.secondaryLight,
    text: {
      color: theme.colors.textSecondary,
    },
  },
  danger: {
    container: {
      backgroundColor: theme.colors.danger,
    },
    highlight: theme.colors.dangerDark,
    text: {
      color: theme.colors.dangerSurface,
    },
  },
});

const link: ButtonStyles = theme => ({
  primary: {
    text: {
      color: theme.colors.primary,
      textDecorationColor: theme.colors.primary,
    },
  },
  secondary: {
    text: {
      color: theme.colors.secondary,
      textDecorationColor: theme.colors.secondary,
    },
  },
  danger: {
    text: {
      color: theme.colors.danger,
      textDecorationColor: theme.colors.danger,
    },
  },
});

const base = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.sizes.borderRadius,
      paddingHorizontal: 12,
      minHeight: 44,
      width: '100%',
    },
    text: {
      fontSize: 16,
      fontWeight: '600',
    },
    outlineContainer: {
      borderWidth: 1,
    },
    solidContainer: {
      borderWidth: 0,
    },
    linkContainer: {
      minHeight: 'auto',
      paddingVertical: 4,
      width: 'auto',
    },
    linkText: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
    },
  });

export function getButtonStyles(
  theme: ThemeType,
  variant: ButtonVariant,
  scheme: ButtonScheme,
) {
  const baseStyles = base(theme);
  const outlineStyles = outline(theme);
  const solidStyles = solid(theme);
  const linkStyles = link(theme);

  if (variant === 'outline') {
    return {
      container: [
        baseStyles.container,
        baseStyles.outlineContainer,
        outlineStyles[scheme].container,
      ],
      text: [baseStyles.text, outlineStyles[scheme].text],
      highlight: outlineStyles[scheme].highlight,
    };
  }

  if (variant === 'link') {
    return {
      container: [
        baseStyles.container,
        baseStyles.linkContainer,
        linkStyles[scheme].container,
      ],
      text: [baseStyles.text, baseStyles.linkText, linkStyles[scheme].text],
      highlight: 'transparent',
    };
  }

  return {
    container: [
      baseStyles.container,
      baseStyles.solidContainer,
      solidStyles[scheme].container,
    ],
    text: [baseStyles.text, solidStyles[scheme].text],
    highlight: solidStyles[scheme].highlight,
  };
}
