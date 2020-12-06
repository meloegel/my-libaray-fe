import React, { useContext } from 'react'
import BookContext from '../contexts/BookContext'
import Book from './Book'


const BookCard = () => {
    const { bookList } = useContext(BookContext)

    return (
        <div>
            {bookList.map(book => (
                <Book
                    key={book.id}
                    book={book}
                    className='book'
                />
            ))}

        </div>
    )
}

export default BookCard;