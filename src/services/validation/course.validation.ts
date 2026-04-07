import * as yup from "yup";

export const courseSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  categoryId: yup.string().required("Category is required"),
});
