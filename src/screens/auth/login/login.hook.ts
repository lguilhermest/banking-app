import { useAsyncAction, useAuth, useForm } from '@hooks';
import { AuthRequest, AuthResponse } from '@types';
import { LoginSchema } from './login.schema';
import api from '@api';

export function useLogin() {
  const auth = useAuth();
  const form = useForm(LoginSchema, {
    email: 'user@email.com',
    password: 'password',
  });

  const login = useAsyncAction(async (data: AuthRequest) => {
    const response = await api.post<AuthResponse>('/auth', data);
    api.setToken(response.token);
    auth.dispatch('credentials', data);
    auth.dispatch(
      'expiresAt',
      new Date(Date.now() + response.expires_in * 1000).toISOString(),
    );
  });

  return {
    loading: login.loading || auth.state.isLoading,
    form: {
      ...form,
      submit: form.handleSubmit(login.execute),
    },
  };
}
