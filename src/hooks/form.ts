import { ZodObject, ZodRawShape, z } from 'zod';
import { useCreateReducer } from './reducer';
import { InputFieldProps } from '@components';

export function useForm<T extends ZodRawShape>(
  schema: ZodObject<T>,
  initialValues: Partial<z.infer<typeof schema>> = {},
  formatters: Partial<
    Record<keyof z.infer<typeof schema>, (value: any) => any>
  > = {},
) {
  type FormValues = z.infer<typeof schema>;

  const [state, dispatch] = useCreateReducer<FormValues>(initialValues);

  const [errors, errorsDispatch] = useCreateReducer<
    Partial<Record<keyof FormValues, string>>
  >({});

  function setValue<K extends keyof FormValues>(
    field: K,
    rawValue: FormValues[K],
  ) {
    const formatter = formatters[field];
    const value = formatter ? formatter(rawValue) : rawValue;

    dispatch(field, value);
    validateField(field, value);
  }

  function reset() {
    dispatch.reset();
    errorsDispatch.reset();
  }

  function validateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    const fieldSchema = schema.shape[field];
    const result = fieldSchema.safeParse(value);
    if (result.success) {
      errorsDispatch(field, undefined);
    } else {
      errorsDispatch(field, result.error.errors[0].message);
    }
  }

  function validateForm() {
    const result = schema.safeParse(state);

    if (result.success) {
      errorsDispatch.reset();
      return { valid: true, values: result.data };
    }

    const objectErrors: Partial<Record<keyof FormValues, string>> = {};
    result.error.issues.forEach(issue => {
      objectErrors[issue.path[0] as keyof FormValues] = issue.message;
    });
    errorsDispatch.update(objectErrors);

    return { valid: false, values: state };
  }

  const control = Object.keys(schema.shape).reduce<
    Record<keyof FormValues, Partial<InputFieldProps>>
  >((acc, key) => {
    acc[key as keyof FormValues] = {
      value: String(state[key as keyof FormValues] ?? ''),
      error: !!errors[key as keyof FormValues],
      errorText: errors[key as keyof FormValues] ?? '',
      onChangeText: (value: string) =>
        setValue(key as keyof FormValues, value as any),
    };
    return acc;
  }, {} as Record<keyof FormValues, InputFieldProps>);

  function handleSubmit(callback: (data: FormValues) => void) {
    return () => {
      const { valid, values } = validateForm();

      if (valid) {
        callback(values);
      }
    };
  }

  return {
    state,
    errors,
    control,
    handleSubmit,
    setValue,
    reset,
    validateForm,
  };
}
