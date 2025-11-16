import { getErrorCode, getErrorMessage } from '@utils';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDialog } from './dialog';

export function useAsyncAction<T extends any[]>(
  fn: (...args: T) => Promise<void>,
  onError?: (error: any, code?: string, httpStatus?: number) => void,
  autoExecute: boolean = false,
  defaultArgs?: T,
) {
  const { t } = useTranslation();
  const dialog = useDialog();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  function execute(...args: T) {
    setLoading(true);
    setError(undefined);
    fn(...args)
      .then(() => {})
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  }

  function handleError(e: any) {
    const code = getErrorCode(e);

    if (code) {
      setError(e);
    }

    if (onError) {
      return onError(e, code || undefined, e.response?.status);
    }

    dialog().danger(
      code ? t(`errors.${code}.message`) : getErrorMessage(e),
      code ? t(`errors.${code}.title`) : t('common.error'),
    );
  }

  useEffect(() => {
    if (autoExecute && defaultArgs) execute(...defaultArgs);
  }, []);

  return { execute, loading, error };
}
