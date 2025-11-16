import { StyleProp, ViewStyle } from "react-native";
import { ButtonScheme, ButtonVariant } from "../form";

export interface FooterActionsProps {
  footerStyle?: StyleProp<ViewStyle>;
  primaryActionLabel?: string;
  primaryActionScheme?: ButtonScheme;
  primaryActionVariant?: ButtonVariant;
  secondaryActionLabel?: string;
  secondaryActionScheme?: ButtonScheme;
  secondaryActionVariant?: ButtonVariant;
  onPrimaryActionPress?: () => void;
  onSecondaryActionPress?: () => void;
  primaryActionLoading?: boolean;
  secondaryActionLoading?: boolean;
}
