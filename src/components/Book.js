import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth'
import UserContext from '../contexts/UserContext'

const Book = ({ book }) => {
    const { push } = useHistory();
    const { userId } = useContext(UserContext)


    const handleDelete = e => {
        axiosWithAuth()
            .delete(`/users/${book.id}/books`)
            .then(res => {
                window.location.reload()
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='book'>
            <img src={`${book.coverArt}`} alt='Not Available' />
            <h2 className='title'>Title: {book.title}</h2>
            <h2 className='author'>Author: {book.author}</h2>
            <h2 className='pageCount'>Page Count: {book.pageCount}</h2>
            <h2 className='yearPublished'>Year Published: {book.yearPublished}</h2>
            <h2 className='description'>Description: {book.description}</h2>
            <button onClick={() => push(`/books/${book.id}`)}>Edit Book</button>
            <button onClick={handleDelete}>Delete Book</button>
        </div>
    )
}

export default Book;
