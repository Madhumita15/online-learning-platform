import type { FormConfig } from "../../typescript/interface/form.interface";
// import type { SignupType } from "../../typescript/type/auth.type";
import { signup } from "../json/inputsData/signup.input";
import { SignupSchema } from "../validation/signup.validation";



export const signupConfig: FormConfig= {
    title: "Register Form",
    schema: SignupSchema,
    inputs: signup,
    buttonText: "Register",
    defaultValues: {
        name: "",
        email: "",
        password: "",
        
    }
}