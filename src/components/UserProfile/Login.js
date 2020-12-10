import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import loginSchema from "../../validation/loginSchema";
import * as yup from "yup";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

const initialFormValues = {
    username: '',
    password: ''
}

const initialFormErrors = {
    username: "",
    password: "",
};
const initialDisabled = true;


export default function Login() {
    const { push } = useHistory();
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);

    const onInputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;

        yup
            .reach(loginSchema, name)
            .validate(value)
            .then((valid) => {
                setFormErrors({
                    ...formErrors,
                    [name]: "",
                });
            })
            .catch((err) => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0],
                });
            });
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
        axiosWithAuth()
            .post(`/api/auth/login`, formValues)
            .then((response) => {
                console.log(response.data.user.id, "resdata");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem('userId', response.data.user.id)
                push('/books')
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        loginSchema.isValid(formValues).then((valid) => {
            setDisabled(!valid);
        });
    }, [formValues]);

    return (
        <div className="login container">
            <Card body bg='info' className='formCardLog'>
                <h4>Login Information</h4>
                <form className='form' onSubmit={onSubmit} disabled={disabled}>
                    <InputGroup id='input'>
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={formValues.username}
                            onChange={onInputChange}
                            name="username"
                            type="text"
                        />
                    </InputGroup>
                    <InputGroup id='input'>
                        <FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            value={formValues.password}
                            onChange={onInputChange}
                            name="password"
                            type="text"
                        />
                    </InputGroup>
                    <Button className="submit">Login</Button>
                    <div className="errors">
                        <div>{formErrors.username}</div>
                        <div>{formErrors.password}</div>
                    </div>
                </form>
            </Card>
        </div >
    );
}
