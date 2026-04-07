import type { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import type { Path } from "react-hook-form";


export type DynamicInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type: string;
  register: UseFormRegister<T>;
  required: boolean,
  errors: FieldErrors<T>
  loading: boolean
  rows?: number
  isEdit: string | null
};