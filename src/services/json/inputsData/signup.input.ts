import type { InputInterface } from "../../../typescript/interface/auth.interface"
 export const signup:InputInterface[] = [
    {
        label: "Name",
        type: "text",
        required: false,
        name: "name"
    },
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
