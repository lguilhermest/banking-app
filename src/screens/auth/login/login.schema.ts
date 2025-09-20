import z from 'zod';

export const LoginSchema = z.object({
  email: z.string({ message: 'Campo obrigatório' }).email('Email inválido'),
  password: z.string({ message: 'Campo obrigatório' }).min(8, 'Senha inválida'),
});

export type LoginForm = z.infer<typeof LoginSchema>;
