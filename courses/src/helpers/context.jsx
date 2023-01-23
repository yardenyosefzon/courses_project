import React, { Children } from 'react';
import { createContext, useEffect } from 'react';
import { useState } from 'react';
import {logIn,signUp,getCoursesById,deleteCourse,getSubjects,addCourse,getUserById,changePassword} from './coursesReqs';
import decode from 'jwt-decode';

export const CoursesContext=createContext();

const Context = (props) => {

    const {children}=props;

    //////PAGE
    const [page,setPage]=useState('myCourses'); 

    ////////FORM
    const [form,setForm]=useState({});
    const [hidden,setHidden]=useState('hidden');
    const [identicle,setIdenticle]=useState('identicle');

    ////////URL
    const [url,setUrl]=useState('http://127.0.0.1:4000/api/');
    const [ending,setEnding]=useState('users');

    ///////VARS
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [userList,setUserList]=useState([]);
    const [subjectsList,setSubjectsList]=useState([]);
    const [display,setDisplay]=useState('none');
    const [passwordPeg,setPasswordPeg]=useState('current');
    const [id,setId]=useState(0);
    const [switc,setSwitc]=useState('');
    const [delet,setDelet]=useState(-1);
    
    const idePass=(password,cpassword)=>{

        if(password!==cpassword)
        setIdenticle('notIdenticle');
        else
        setIdenticle('identicle');

    }

    const switchDot=(index)=>{

        setSwitc('switch');
        setTimeout(() => {
            setId(index);
        }, 100);
        setTimeout(() => {
            setSwitc('');
        }, 500);

    }

    const getUserList=()=>{

        let token=localStorage.getItem('token');
        token=(decode(token));
        const result=getCoursesById(url+'courses/getCoursesById',token.id);
        result.then((result)=>{
            
            setUserList(result.data);

    })
}

    return (

        <CoursesContext.Provider value={{form,setForm,logIn,signUp,url,ending,setEnding,name,setName,hidden,setHidden,idePass,identicle,setIdenticle,page,setPage,userList,setUserList,getCoursesById,display,setDisplay,deleteCourse,getUserList,getSubjects,subjectsList,setSubjectsList,addCourse,getUserById,email,setEmail,passwordPeg,setPasswordPeg,changePassword,id,setId,switc,setSwitc,switchDot,delet,setDelet}}>

           {children}

        </CoursesContext.Provider>

    );
}

export default Context;
