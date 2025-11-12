import { UseFormReturn } from "react-hook-form";
import { ViewStyle } from "react-native";

export interface InputCurrencyProps {
  value?: number;
  onChangeValue?: (value: number) => void;
  editable?: boolean;
  autoFocus?: boolean;
  hideBalance?: boolean;
  error?: string;
  style?: ViewStyle;
  form?: UseFormReturn<any>;
  field?: string;
}
