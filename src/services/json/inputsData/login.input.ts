import type { InputInterface } from "../../../typescript/interface/auth.interface";


 export const login:InputInterface[] = [
    {
        label: "Email",
        type: "text",
        required: true,
        name: "email"
    },
    {
        label: "password",
        type: "password",
        required: true,
        name: "password"
    },
    
    
]