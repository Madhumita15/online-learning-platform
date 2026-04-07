import * as yup from 'yup'
import type { LoginType } from '../../typescript/type/auth.type'

export const loginSchema: yup.ObjectSchema<LoginType>  = yup.object({
    email: yup.string().required("Email is Required").email("Invalid Email"),
    password: yup.string().required("Password is required").min(6, "Password must be 6 character")
})