import { Input } from '@/components/ui/input';

import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form';

type ControlledInputProps<T extends FieldValues> = UseControllerProps<T> & {
  placeholder?: string;
  label?: string;
} & React.ComponentProps<'input'>;
export function ControlledInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  ...props
}: ControlledInputProps<T>) {
  const { field, fieldState } = useController<T>({
    name,
    control,
    defaultValue,
  });
  return (
    <Input
      {...props}
      label={label}
      onChange={field.onChange}
      value={field.value || ''}
      error={fieldState.error?.message}
    />
  );
}
