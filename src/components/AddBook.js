import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import BookContext from '../contexts/BookContext'
import UserContext from '../contexts/UserContext'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'

const initlalDetails = {
    title: '',
    author: '',
    pageCount: '',
    yearPublished: '',
    coverArt: '',
    description: '',
}

const AddBook = () => {
    const { push } = useHistory();
    const [details, setDetails] = useState(initlalDetails)
    const { bookList, setBookList } = useContext(BookContext)
    const { userId } = useContext(UserContext)

    const handleChange = e => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post(`api/auth/books`, details)
            .then(res => {
                console.log(res)
                setBookList([...bookList, details]);
                push(`/books`).reset()
            })
            .catch(err => console.log(err))
    }


    return (
        <div id='addBook'>
            <Card body bg='info' className='formCardAddBook'>
                <h2>Add A Book</h2>
                <form className='form' >
                    <InputGroup id='input'>
                        <FormControl
                            placeholder="Title"
                            aria-label="Title"
                            aria-describedby="basic-addon1"
                            value={details.title}
                            onChange={handleChange}
                            name="title"
                            type="text"
                        />
                    </InputGroup>
                    <InputGroup id='input'>
                        <FormControl
                            placeholder="Author"
                            aria-label="Author"
                            aria-describedby="basic-addon1"
                            value={details.author}
                            onChange={handleChange}
                            name="author"
                            type="text"
                        />
                    </InputGroup>
                    <InputGroup id='input'>
                        <FormControl
                            placeholder="Page Count"
                            aria-label="Page Count"
                            aria-describedby="basic-addon1"
                            value={details.pageCount}
                            onChange={handleChange}
                            name="pageCount"
                            type="number"
                        />
                    </InputGroup>
                    <InputGroup id='input'>
                        <FormControl
                            placeholder="Year Published"
                            aria-label="Year Published"
                            aria-describedby="basic-addon1"
                            value={details.yearPublished}
                            onChange={handleChange}
                            name="yearPublished"
                            type="text"
                        />
                    </InputGroup>
                    <InputGroup id='input'>
                        <FormControl
                            placeholder="Description"
                            aria-label="Description"
                            aria-describedby="basic-addon1"
                            value={details.description}
                            onChange={handleChange}
                            name="description"
                            type="text"
                        />
                    </InputGroup>
                    <InputGroup id='input'>
                        <InputGroup.Prepend className='inputPrepend'>
                            <InputGroup.Text id="basic-addon3">
                                https://
                                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Cover Art"
                            aria-label="Cover Art"
                            aria-describedby="basic-addon1"
                            value={details.coverArt}
                            onChange={handleChange}
                            name="coverArt"
                            type="link"
                        />
                    </InputGroup>
                    {/* <InputGroup id='input'>
                        <FormControl
                            placeholder="userId"
                            aria-label="Description"
                            aria-describedby="basic-addon1"
                            value={details.userId}
                            onChange={handleChange}
                            name="userId"
                            type="text"
                        />
                    </InputGroup> */}
                    <input
                        id='idInput'
                        type="text"
                        name="userId"
                        onChange={handleChange}
                        value={userId.userId}
                    />
                    <Button className="add-button" onClick={handleSubmit}>Add New Book</Button>
                </form>
            </Card>
        </div>
    )
}

export default AddBook;