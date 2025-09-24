import { LoginForm, LoginSchema } from './login.schema';
import { useForm, useMutation } from '@hooks';
import { useAuth } from '@context';
import api from '@api';

export function useLogin() {
  const auth = useAuth();
  const form = useForm(LoginSchema, {
    email: 'user@email.com',
    password: 'password',
  });

  const { loading, execute } = useMutation(async (data: LoginForm) => {
    const response = await api.post('/auth', data);
    api.setToken(response.token);
    const user = await api.get('/user');

    auth.dispatch.update({
      isAuthenticated: true,
      isLoading: false,
      refreshToken: response.token,
      user,
    });
  });

  return {
    loading,
    form: {
      ...form,
      submit: form.handleSubmit(execute),
    },
  };
}
