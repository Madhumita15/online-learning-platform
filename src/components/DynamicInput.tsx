import { TextField } from "@mui/material";
import type { FieldValues } from "react-hook-form";
import type { DynamicInputProps } from "../typescript/type/input.type";

const DynamicInput= <T extends FieldValues>({ label, name, register, type, required, errors, loading, rows, isEdit }:DynamicInputProps<T>) => {
  const DynamicError = errors[name];
  const errorMessage = DynamicError?.message as string | undefined;
  const isEditMode = Boolean(isEdit)
  return (
    <>
      <TextField
      className="w-[250px] md:w-[350px]"
        label={
            required ? <>{label}<span className="text-red-600">*</span></> : label
        }
        type={type}
        error={!!DynamicError}
        multiline={type === "textarea"}
        rows={type === "textarea" ? (rows ?? 3) : undefined }
        helperText={errorMessage}
        {...register(name, {...name === "price" ? {valueAsNumber: true} : {}})}
        disabled={loading || (type === "file" && isEditMode)} 
             />
    </>
  );
};

export default DynamicInput;
