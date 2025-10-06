import { useAsyncAction, useAuth, useForm } from '@hooks';
import { LoginForm, LoginSchema } from './login.schema';
import api from '@api';

export function useLogin() {
  const auth = useAuth();
  const form = useForm(LoginSchema, {
    email: 'user@email.com',
    password: 'password',
  });

  const login = useAsyncAction(async (data: LoginForm) => {
    const response = await api.post<{ token: string }>('/auth', data);
    api.setToken(response.token);
    auth.dispatch('credentials', data);
  });

  return {
    loading: login.loading || auth.state.isLoading,
    form: {
      ...form,
      submit: form.handleSubmit(login.execute),
    },
  };
}
