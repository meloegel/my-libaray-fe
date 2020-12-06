import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import BookContext from '../contexts/BookContext'
import UserContext from '../contexts/UserContext'

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
            <h2>Add A Book</h2>
            <form id='addBookForm' onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Title"
                    value={details.title}
                />
                <div />
                <input
                    type="text"
                    name="author"
                    onChange={handleChange}
                    placeholder="Author"
                    value={details.author}
                />
                <div />
                <input
                    type="text"
                    name="pageCount"
                    onChange={handleChange}
                    placeholder="Page Count"
                    value={details.pageCount}
                />
                <div />
                <input
                    type="text"
                    name="yearPublished"
                    onChange={handleChange}
                    placeholder="Year Published"
                    value={details.yearPublished}
                />
                <div />
                <div />
                <input
                    type="text"
                    name="coverArt"
                    onChange={handleChange}
                    placeholder="Cover Art"
                    value={details.coverArt}
                />
                <div />
                <div />
                <input
                    type="text"
                    name="description"
                    onChange={handleChange}
                    placeholder="Description"
                    value={details.description}
                />
                <div />
                <div />
                <input
                    id='idInput'
                    type="text"
                    name="userId"
                    onChange={handleChange}
                    value={userId.userId}
                />
                <div />
                <br />
                <button className="add-button">Add New Book</button>
            </form>
        </div>
    )
}

export default AddBook;