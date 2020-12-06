import React, { useState, useEffect } from "react";
import signUpSchema from "../validation/signUpSchema";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from "react-router-dom";
import * as yup from "yup";

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
        setFormValues({
            username: "",
            password: "",
            email: "",
        });
    };

    return (
        <div className="signup">
            <div>
                <div>
                    <h2>Sign Up</h2>
                </div>
                <div className="form inputs">
                    <h4>General Information</h4>
                    <form className="form container" onSubmit={onSubmit}>
                        <label>
                            Username:
            <input
                                value={formValues.username}
                                onChange={onInputChange}
                                name="username"
                                type="text"
                            />
                        </label>
                        <label>
                            Password:
            <input
                                value={formValues.password}
                                onChange={onInputChange}
                                name="password"
                                type="text"
                            />
                        </label>
                        <label>
                            Email:
            <input
                                value={formValues.email}
                                onChange={onInputChange}
                                name="email"
                                type="email"
                            />
                        </label>
                        <div>
                            <div className="errors">
                                <div>{formErrors.username}</div>
                                <div>{formErrors.password}</div>
                                <div>{formErrors.email}</div>
                            </div>
                            <button className="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
