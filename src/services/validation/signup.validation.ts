import * as yup from 'yup'
import type { SignupType } from '../../typescript/type/auth.type'
export const SignupSchema: yup.ObjectSchema<SignupType> = yup.object({
    email: yup.string().required("Email is required").email("Invalid Email"),
    password: yup.string().required("Password is required").min(6, "Password must be 6 character"),
    name: yup.string(),
})