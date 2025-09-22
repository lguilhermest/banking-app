import { Theme } from '@theme';
import { StyleSheet } from 'react-native';
import { ButtonScheme, ButtonStyles, ButtonVariant } from './button.types';

const outline: ButtonStyles = {
  primary: {
    container: {
      borderColor: Theme.colors.primary,
    },
    highlight: Theme.colors.primaryLight,
    text: {
      color: Theme.colors.primary,
    },
  },
  secondary: {
    container: {
      borderColor: Theme.colors.secondary,
    },
    highlight: Theme.colors.secondaryLight,
    text: {
      color: Theme.colors.secondary,
    },
  },
};

const solid: ButtonStyles = {
  primary: {
    container: {
      backgroundColor: Theme.colors.primary,
    },
    highlight: Theme.colors.primaryDark,
    text: {
      color: Theme.colors.primarySurface,
    },
  },
  secondary: {
    container: {
      backgroundColor: Theme.colors.secondary,
    },
    highlight: Theme.colors.secondaryDark,
    text: {
      color: Theme.colors.secondarySurface,
    },
  },
};

const link: ButtonStyles = {
  primary: {
    text: {
      color: Theme.colors.primary,
      textDecorationColor: Theme.colors.primary,
    },
  },
  secondary: {
    text: {
      color: Theme.colors.secondary,
      textDecorationColor: Theme.colors.secondary,
    },
  },
};

const base = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.sizes.borderRadius,
    paddingHorizontal: 12,
    minHeight: 44,
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
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

export function getButtonStyles(variant: ButtonVariant, scheme: ButtonScheme) {
  if (variant === 'outline') {
    return {
      container: [
        base.container,
        base.outlineContainer,
        outline[scheme].container,
      ],
      text: [base.text, outline[scheme].text],
      highlight: outline[scheme].highlight,
    };
  }

  if (variant === 'link') {
    return {
      container: [base.container, base.linkContainer, link[scheme].container],
      text: [base.text, base.linkText, link[scheme].text],
      highlight: 'transparent',
    };
  }

  return {
    container: [base.container, base.solidContainer, solid[scheme].container],
    text: [base.text, solid[scheme].text],
    highlight: solid[scheme].highlight,
  };
}
