import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type SelectOption = {
  value: string;
  label: string;
};

type ControlledSelectProps<T extends FieldValues> = UseControllerProps<T> & {
  placeholder?: string;
  label?: string;
  options: SelectOption[];
} & React.ComponentProps<typeof Select>;

export function ControlledSelect<T extends FieldValues>({
  name,
  control,
  defaultValue,
  placeholder,
  label,
  options,
  ...props
}: ControlledSelectProps<T>) {
  const { field, fieldState } = useController<T>({
    name,
    control,
    defaultValue,
  });

  return (
    <div className="space-y-2 w-full">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
        {...props}
      >
        <SelectTrigger className={fieldState.error ? 'border-red-500' : ''}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {fieldState.error && (
        <p className="text-sm text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
}
