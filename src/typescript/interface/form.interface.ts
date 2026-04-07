import * as yup from "yup";
import type { InputInterface } from "./auth.interface";
import type { DefaultValues, FieldValues } from "react-hook-form";



export interface FormConfig {
  title: string;
  schema: yup.ObjectSchema<yup.AnyObject>; // ✅ relax here
  inputs: InputInterface[]; // ✅ relax here
  buttonText: string;
  defaultValues: DefaultValues<FieldValues>;
}

