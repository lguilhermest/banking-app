import { ZodObject } from 'zod';
import { useCreateReducer } from './reducer';
import { InputFieldProps } from '@components';

export type FieldState<T> = {
  value: T;
  error: string;
};

export function useForm<T extends any>(
  schema: ZodObject<any>,
  initialValues: Partial<T> = {},
) {
  const [state, dispatch] = useCreateReducer<FieldState<T>>(initialValues);
  const [errors, errorsDispatch] = useCreateReducer<FieldState<T>>({});

  const control = Object.keys(state).reduce<Record<keyof T, InputFieldProps>>(
    (acc, key) => {
      acc[key as keyof T] = {
        value: state[key as keyof FieldState<T>] as string,
        onChangeText: (value: string) => {
          const fieldSchema = schema.shape[key];
          const result = fieldSchema.safeParse(value);

          if (result.success) {
            errorsDispatch(key as keyof FieldState<T>, undefined);
          } else {
            const message = result.error.issues
              .map((issue: any) => issue.message)
              .join(', ');
            errorsDispatch(key as keyof FieldState<T>, message);
          }

          dispatch(key as keyof FieldState<T>, value);
        },
        error: !!errors[key as keyof FieldState<T>],
        errorText: errors[key as keyof FieldState<T>] as string,
      };
      return acc;
    },
    {} as Record<keyof T, InputFieldProps>,
  );

  function handleSubmit(callback: (data: T) => void) {
    return () => {
      const result = schema.safeParse(state);

      if (result.success) {
        return callback(result.data as T);
      }

      const errors: Partial<T> = {};
      result.error.issues.forEach((issue: any) => {
        errors[issue.path[0] as keyof T] = issue.message;
      });

      errorsDispatch.update(errors);

      return result.error;
    };
  }

  return {
    state,
    errors,
    control,
    handleSubmit,
  };
}
