const { object, string, ref } = require("yup");

const userSchema = object().shape({
    name: string()
        .min(3, "This field must be at least 3 characters long.")
        .max(20, "This field must be at most 20 characters long.")
        .required("This  field must not be empty."),
    email: string()
        .required("This  field must not be empty."),
    password: string()
        .min(8, "This field must be at least 8 characters long.")
        .max(20, "This field must be at most 20 characters long.")
        .required("This  field must not be empty."),
    confirmPassword: string()
        .oneOf([ref("password"), null], "Password must be matched")
        .required("This  field must not be empty."),
});

const userUpdateSchema = object().shape({
    name: string()
        .min(3, "This field must be at least 3 characters long.")
        .max(20, "This field must be at most 20 characters long."),
    password: string()
});

module.exports.userSchema = userSchema;
module.exports.userUpdateSchema = userUpdateSchema;