import React from 'react';
import { CoursesContext } from '../helpers/context';
import { useContext } from 'react';
import decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

const NavBbar = () => {

    const {setPage,setHidden,setDisplay}=useContext(CoursesContext);

    const navigate=useNavigate();

    return (
        <div className='navBar'>

            <div className='navLogo'>YO-courses</div>
            <div className='navButtonContainer'><button className='navButton' onClick={()=>{setPage('myCourses');setHidden('hidden');setDisplay('none');return}}>My courses</button></div>
            <div className='navButtonContainer'><button className='navButton' onClick={()=>{setPage('joinCourses');setHidden('hidden');setDisplay('none');return}}>Join courses</button></div>
            <div className='navButtonContainer logOut'><button className='navButton' onClick={()=>{localStorage.removeItem('token');navigate('/');setHidden('hidden');setDisplay('none');return}}>Log out</button></div>
            <div className='navButtonContainer nameButton'><button className='navButton' onClick={()=>{setPage('userDetails');setHidden('hidden');setDisplay('none');return}}>{(decode(localStorage.getItem('token')))['name']}</button></div>
            
        </div>
    );
}

export default NavBbar;
