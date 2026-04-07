import type { InputInterface } from "../../../typescript/interface/auth.interface";

export const blogsInput:InputInterface[] = [
    {
        label: "Title",
        type: "text",
        required: true,
        name: "title"

    },
    {
        label: "Content",
        type: "text",
        required: true,
        name: "content"

    },
    {
        label: " ",
        type: "file",
        required: false,
        name: "image"

    },
]