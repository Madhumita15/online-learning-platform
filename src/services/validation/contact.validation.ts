import * as yup from "yup";

export const ContactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid Email"),
  subject: yup.string().required("Subject is required"),
  query: yup.string().required("Message is required"),
});