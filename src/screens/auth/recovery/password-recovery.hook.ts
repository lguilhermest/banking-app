import api from '@api';
import {
  PasswordRecoveryForm,
  PasswordRecoverySchema,
} from './password-recovery.schema';
import { useForm } from '@hooks';

export function usePasswordRecovery() {
  const form = useForm(PasswordRecoverySchema);

  async function handleSubmit(data: PasswordRecoveryForm) {
    try {
      const response = await api.post('/auth/password-recovery', data);
    } catch (error) {}
  }

  return {
    form: {
      ...form,
      submit: form.handleSubmit(handleSubmit),
    },
  };
}
