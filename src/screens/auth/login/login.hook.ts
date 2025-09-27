import { useAuth, useDialog, useForm, useMutation } from '@hooks';
import { LoginForm, LoginSchema } from './login.schema';
import { useTranslation } from 'react-i18next';
import { getErrorCode } from '@utils';
import api from '@api';

export function useLogin() {
  const auth = useAuth();
  const dialog = useDialog();
  const { t } = useTranslation();
  const form = useForm(LoginSchema, {
    email: 'user@email.com',
    password: 'password',
  });

  const { loading, execute } = useMutation(
    async (data: LoginForm) => {
      const response = await api.post<{ token: string }>('/auth', data);
      api.setToken(response.token);
      auth.dispatch('credentials', data);
    },
    {
      onError(error) {
        const code = getErrorCode(error);
        dialog().danger(t(`errors.${code}.message`), t(`errors.${code}.title`));
      },
    },
  );

  return {
    loading: loading || auth.state.isLoading,
    form: {
      ...form,
      submit: form.handleSubmit(execute),
    },
  };
}
