import type { FormConfig } from "../../typescript/interface/form.interface";
import { login } from "../json/inputsData/login.input";
import { loginSchema } from "../validation/login.validation";


export const loginConfig:FormConfig = {
    title: "Login Form",
    buttonText: "Login",
    schema: loginSchema,
    inputs: login,
    defaultValues: {
        email: "",
        password: ""
    }
}