import type { FormConfig } from "../interface/form.interface";

export type FormDialogInterface = {
  open: boolean;
  setOpen: (vale: boolean) => void;
  config: FormConfig;
  setConfig: (config: FormConfig) => void;
  from?: string;
};

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};
