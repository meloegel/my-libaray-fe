import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import UserContext from '../../contexts/UserContext'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'

const initialDetails = {
    username: '',
    email: '',
    avatar: ''
}

const UserProfile = () => {
    const { push } = useHistory();
    const [details, setDetails] = useState(initialDetails);
    const { userId, setUserId } = useContext(UserContext)
    console.log(userId)

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/auth/users/${userId.userId}`)
            .then(res => {
                console.log(res)
                setDetails(res.data);
            })
            .catch(err => console.log(err));
    }, [userId]);

    const handleChange = e => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        setUserId({
            userId: window.localStorage.getItem('userId')
        })
        axiosWithAuth()
            .put(`/api/auth/users/${userId.userId}`, details)
            .then(res => {
                console.log(res)
                push(`/account`)
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <Card body bg='success' className='formCardAcc'>
                <h2 id='updateUserInfo'>Update Account Information</h2>
                <form className='form'>
                    <InputGroup id='input'>
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={details.username}
                            onChange={handleChange}
                            name="username"
                            type="text"
                        />
                    </InputGroup>
                    <InputGroup id='input'>
                        <FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            value={details.email}
                            onChange={handleChange}
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
                            value={details.avatar}
                            onChange={handleChange}
                            name="avatar"
                            type="text"
                        />
                    </InputGroup>
                    <Button className="submit" onClick={handleSubmit} variant='primary'>Submit</Button>


                </form>
            </Card>
        </div>
    )
}

export default UserProfile;