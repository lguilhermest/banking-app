import api from '@api';
import { useForm } from '@utils';
import { useState } from 'react';
import { LoginForm, LoginSchema } from './login.schema';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const form = useForm(LoginSchema);

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
