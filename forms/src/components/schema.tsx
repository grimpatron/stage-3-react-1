import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: yup.string().required('Email is required').email('Enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*!])[0-9a-zA-Z@#$%^&*!]*$/,
      'Password must include at least 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    ),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*!])[0-9a-zA-Z@#$%^&*!]*$/,
      'Password must include at least 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    ),
  gender: yup.string().required('Gender is required'),
  termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  picture: yup.string().required('Picture is required'),
  country: yup.string().required('Country is required'),
});

export default schema;
