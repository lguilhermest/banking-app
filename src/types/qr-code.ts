import { PixInitializationType } from "./pix";
import { Participant } from "./participant";

export interface DecodeQrCode {
  type: PixInitializationType.QRDN | PixInitializationType.QRES;
  key: {
    value: string;
    type: string;
  };
  amount: QrCodeAmount;
  end_to_end_id: string;
  name: string;
  participant: Participant;
  expiration: number;
  transaction_id: string;
  additional_data: Array<{
    name: string;
    value: string;
  }>;
}

export interface QrCodeAmount {
  amount_to_pay: number;
  amount: number;
  final_amount: number;
  original_amount: number;
  change_amount: number;
  can_alter_amount: boolean;
}
