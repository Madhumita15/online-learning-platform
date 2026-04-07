import type { InputInterface } from "../../../typescript/interface/auth.interface"
 export const instructorInput:InputInterface[] = [
    {
        label: "Name",
        type: "text",
        required: true,
        name: "name"
    },
    {
        label: "Email",
        type: "text",
        required: true,
        name: "email"
    },
    {
        label: "Phone",
        type: "text",
        required: true,
        name: "phone"
    },
    {
        label: "Experience",
        type: "text",
        required: true,
        name: "experience"
    },
    {
        label: "Skills",
        type: "text",
        required: true,
        name: "skills"
    },
    {
        label: "Bio",
        type: "textarea",
        required: true,
        name: "bio"
    },
    {
        label: "",
        type: "file",
        required: false,
        name: "image"
    },
    
    
]
