import z from 'zod';

export const PasswordRecoverySchema = z.object({
  email: z
    .string({ message: 'Campo obrigatório' })
    .email({ message: 'Email inválido' }),
});

export type PasswordRecoveryForm = z.infer<typeof PasswordRecoverySchema>;
