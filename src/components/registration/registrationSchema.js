import * as yup from "yup";

export const schema = yup.object().shape({
    name: yup
        .string()
        .required("Full name is required")
        .min(3, "Name should be at least 3 characters long"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    birthDate: yup.string().required("Birth date is required"),
    source: yup.string().required("Please select a source"),
});
