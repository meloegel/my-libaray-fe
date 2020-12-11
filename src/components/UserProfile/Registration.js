import React, { useState, useEffect } from "react";
import signUpSchema from "../../validation/signUpSchema";
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'

const initialFormValues = {
    username: "",
    password: "",
    email: "",
    avatar: ""
};
const initialFormErrors = {
    username: "",
    password: "",
    email: "",
    avatar: ""
};
const initialDisabled = true;
const initialUsers = [];

export default function Registration() {
    const { push } = useHistory();
    const [users, setUser] = useState(initialUsers);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);

    const onInputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;

        yup
            .reach(signUpSchema, name)
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
    useEffect(() => {
        signUpSchema.isValid(formValues).then((valid) => {
            setDisabled(!valid);
        });
    }, [formValues]);


    const onSubmit = (evt) => {
        evt.preventDefault();
        axiosWithAuth()
            .post(
                "/api/auth/register",
                formValues
            )
            .then((res) => {
                setUser([...users, res.data]);
                push('/login')
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="signup">
            <Card body bg='info' className='formCardReg'>
                <h4>Registration</h4>
                <form className='form' >
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
                    <InputGroup id='input'>
                        <FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            value={formValues.email}
                            onChange={onInputChange}
                            name="email"
                            type="email"
                        />
                    </InputGroup>
                    <InputGroup id='input'>
                        <InputGroup.Prepend className='inputPrepend'>
                            <InputGroup.Text id="basic-addon3">
                                https://
                                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Avatar"
                            aria-label="Avatar"
                            aria-describedby="basic-addon1"
                            value={formValues.avatar}
                            onChange={onInputChange}
                            name="avatar"
                            type="text"
                        />
                    </InputGroup>
                    <Button className="submit" onClick={onSubmit} variant='primary' disabled={disabled}>Submit</Button>
                    <div className="errors">
                        <div>{formErrors.username}</div>
                        <div>{formErrors.password}</div>
                        <div>{formErrors.email}</div>
                    </div>
                </form>
            </Card>
        </div>
    );
}
