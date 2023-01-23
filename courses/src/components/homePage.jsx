import React from 'react';
import JoinCourses from './joinCourses';
import MyCourses from './myCourses';
import NavBbar from './navBbar';
import { useContext } from 'react';
import { CoursesContext } from './../helpers/context';
import UserDetails from './userDetails';

const HomePage = () => {

    const {form,setForm,logIn,signUp,url,ending,setEnding,name,setName,hidden,setHidden,idePass,identicle,setIdenticle,page}=useContext(CoursesContext)

    return (
        <div>

            <div>
                
                    <NavBbar/>
                    
                    {page==='myCourses'?<MyCourses/>:page==='joinCourses'?<JoinCourses/>:<UserDetails/>}        
                
            </div>
            
        </div>
    );
}

export default HomePage;
