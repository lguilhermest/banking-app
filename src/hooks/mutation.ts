import { useState, useCallback } from 'react';

type MutationOptions<TData, TError = any> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
};

export function useMutation<TData = any, TVariables = any, TError = any>(
  fn: (variables: TVariables) => Promise<TData>,
  options?: MutationOptions<TData, TError>,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TError | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const execute = useCallback(
    async (variables: TVariables) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fn(variables);
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err: any) {
        setError(err);
        options?.onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fn, options],
  );

  return { loading, error, data, execute };
}
