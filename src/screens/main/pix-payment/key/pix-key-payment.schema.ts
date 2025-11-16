import { getPixKeyType } from '@utils';
import { t } from 'i18next';
import z from 'zod';

export const PixKeySchema = z.object({
  key: z.string().superRefine((value, ctx) => {
    if (!value || value.trim().length === 0) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('common.required_field'),
      });
    }

    if (getPixKeyType(value) === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('main.pix_key.invalid'),
      });
    }
  }),
});

export type PixKeySchemaType = z.infer<typeof PixKeySchema>;
