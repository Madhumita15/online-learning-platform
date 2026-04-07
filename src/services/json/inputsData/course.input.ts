import type { InputInterface } from "../../../typescript/interface/auth.interface";
export const courseInput:InputInterface[]= [
    {
        label: "Title",
        type: "text",
        required: true,
        name: "title"

    },
    {
        label: "Description",
        type: "textarea",
        required: true,
        name: "description"

    },
    
    {
        label: "Price",
        type: "number",
        required: true,
        name: "price"

    },
    {
        label: " ",
        type: "file",
        required: false,
        name: "image"

    },
]