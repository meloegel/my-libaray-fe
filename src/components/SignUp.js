import React, { useState, useEffect } from "react";
import signUpSchema from "../validation/signUpSchema";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'

const initialFormValues = {
    username: "",
    password: "",
    email: "",
};
const initialFormErrors = {
    username: "",
    password: "",
    email: "",
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
            <div>
                <div>
                    <h2>Sign Up</h2>
                </div>
                <div className="form inputs">
                    <Card border='black' bg='dark' style={{ width: '45rem', border: '2px solid black', margin: '0 auto' }} >
                        <h4>General Information</h4>
                        <InputGroup className="mb-3" onSubmit={onSubmit} disabled={disabled}>
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={formValues.username}
                                onChange={onInputChange}
                                name="username"
                                type="text"
                            />
                            <FormControl
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                                value={formValues.password}
                                onChange={onInputChange}
                                name="password"
                                type="text"
                            />
                            <FormControl
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                                value={formValues.email}
                                onChange={onInputChange}
                                name="email"
                                type="email"
                            />
                            <button className="submit">Submit</button>
                        </InputGroup>
                        <div>
                            <div className="errors">
                                <div>{formErrors.username}</div>
                                <div>{formErrors.password}</div>
                                <div>{formErrors.email}</div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
