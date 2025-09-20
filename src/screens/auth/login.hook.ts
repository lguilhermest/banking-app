import api from '@api';
import { useForm } from '@utils';
import { useState } from 'react';
import z from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Senha inválida'),
});

type LoginForm = z.infer<typeof schema>;

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const form = useForm(schema, {
    email: '',
    password: '',
  });

  async function handleSubmit(data: LoginForm) {
    try {
      const response = await api.post('/auth/login', data);
    } catch (error) {}
  }

  return {
    form: {
      ...form,
      submit: form.handleSubmit(handleSubmit),
    },
  };
}
