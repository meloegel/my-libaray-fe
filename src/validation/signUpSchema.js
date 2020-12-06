import * as yup from 'yup'


const signUpSchema = yup.object().shape({
    username: yup.string()
        .trim()
        .min(4, 'Username must be at least four characters long')
        .required('Username is a required field'),
    password: yup.string()
        .trim()
        .min(3, 'Password must be at least four characters long')
        .required('Password is a required field'),
    email: yup.string()
        .email('The email must be a valid email address')
})

export default signUpSchema