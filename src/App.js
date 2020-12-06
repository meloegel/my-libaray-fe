import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import './App.css';


import UserProfile from './components/UserProfile'

import Login from './components/Login'
import SignUp from './components/SignUp'
import PrivateRoute from './components/PrivateRoute'
import BookList from './components/MyLibraryBookList'
import AddBook from './components/AddBook'

import UserContext from './contexts/UserContext'
import BookContext from './contexts/BookContext'

function App() {
  const [bookList, setBookList] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState({
    userId: window.localStorage.getItem('userId')
  })

  const handleLogout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
    setUserId('None')
  }

  return (
    <Router>
      <BookContext.Provider value={{ bookList, setBookList }}>
        <UserContext.Provider value={{ userId, setUserId }}>
          <div className="App">
            <nav>
              <NavLink to="/">Sign Up</NavLink>
              <NavLink to="/login" >Sign In</NavLink>
              <NavLink to='/account'>Account</NavLink>
              <NavLink to='/books'>Books</NavLink>
              <NavLink to="/login" onClick={handleLogout}>Logout</NavLink>
            </nav>
            <div>
              <Switch>
                <Route exact path='/' component={SignUp} />
                <Route path='/login' component={Login} />
                <PrivateRoute path='/account' component={UserProfile} />
                <PrivateRoute path='/books' component={BookList} />
                <PrivateRoute path='/add-book' component={AddBook} />
              </Switch>
            </div>
          </div>
        </UserContext.Provider>
      </BookContext.Provider>
    </Router>
  );
}

export default App;
