import React, { useEffect, useContext } from 'react'
import BookCard from './BookCard'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import BookContext from '../contexts/BookContext'
import { useHistory } from "react-router-dom";
import UserContext from '../contexts/UserContext'


const Books = () => {
    const { push } = useHistory();
    const { setBookList } = useContext(BookContext)
    const { userId, setUserId } = useContext(UserContext)
    console.log(userId)

    const getAllBooks = () => {
        axiosWithAuth()
            .get(`api/auth/books`)
            .then(res => setBookList(res.data))
            .catch(err => console.log(err))
    };


    const getUserBooks = () => {
        setUserId({
            userId: window.localStorage.getItem('userId')
        })
        axiosWithAuth()
            .get(`api/auth/users/${userId.userId}/books`)
            .then(res => setBookList(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserBooks(userId.userId)
    }, [userId.userId])


    return (
        <div id='books'>
            <h1>My Library</h1>
            <button onClick={() => getUserBooks()}>My Library</button>
            <button onClick={() => getAllBooks()}>See All Books</button>
            <button onClick={() => push('/add-book')}>Add A Book</button>
            <BookCard />
        </div>
    )

}

export default Books;