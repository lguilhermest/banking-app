import api from '@api';
import { useState } from 'react';
import { LoginForm, LoginSchema } from './login.schema';
import { useForm } from '@hooks';
import { useAuth } from '@context';

export function useLogin() {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const form = useForm(LoginSchema, {
    email: 'teste@teste.com',
    password: '12345678',
  });

  async function handleSubmit(data: LoginForm) {
    setLoading(true);
    try {
      setTimeout(async () => {
        auth.dispatch.update({
          isAuthenticated: true,
          isLoading: false,
          refreshToken: '1234567890',
        });
        setLoading(false);
      }, 1000);
    } catch (error) {}
  }

  return {
    loading,
    form: {
      ...form,
      submit: form.handleSubmit(handleSubmit),
    },
  };
}
