import React, { useContext } from 'react';
import { CoursesContext } from '../helpers/context';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import LogIn from './logIn';
import SignUp from './signUp';
import HomePage from './homePage';
import UserDetails from './userDetails';

const CoursesApp = () => {

    const {form}=useContext(CoursesContext);

    return (
        <BrowserRouter>
            <Routes>
                
                <Route path='/' element={<LogIn/>}/>
                <Route path='/signUp' element={<SignUp/>}/>
                <Route path='/home' element={<HomePage/>}/>

            </Routes>
        </BrowserRouter>
          
    );
}

export default CoursesApp;
