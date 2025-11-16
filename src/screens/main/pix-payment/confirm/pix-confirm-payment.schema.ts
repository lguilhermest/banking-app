import { t } from 'i18next';
import z from 'zod';

export const PixConfirmPaymentSchema = (balance: number) =>
  z.object({
    amount: z
      .number()
      .min(0.01, { message: t('main.pix_confirm_payment.error.greater_than_zero') })
      .refine(value => value <= balance, {
        message: t('common.insufficient_balance'),
      }),
  });

export type PixConfirmPaymentSchemaT = z.infer<
  ReturnType<typeof PixConfirmPaymentSchema>
>;
