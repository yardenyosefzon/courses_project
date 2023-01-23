import React from 'react';
import { useEffect } from 'react';
import { getUserById } from '../helpers/coursesReqs';
import { CoursesContext } from '../helpers/context';
import { useContext } from 'react';
import Current from './password Change/current';
import New from './password Change/new';
import Done from './password Change/done';
import decode from 'jwt-decode';

const UserDetails = () => {

    const {email,setEmail,name,setName,display,setDisplay,passwordPeg,setPasswordPeg}=useContext(CoursesContext);

    useEffect(() => {
        
        setName(decode(localStorage.getItem('token')).name);
        setEmail(decode(localStorage.getItem('token')).email);

    }, [name,email]);
    
    return (
        <>        
            <div className='userDetailsContainer'>
                <div className='userDetailsParContainer'>
                    <article className='personalDetails'>Personal details</article>
                    <article className='email'>Mail: {email}</article>
                    <article className='name'>Name: {name}</article>
                    <button className='changePassword' onClick={()=>{setDisplay('')}}>Change password</button>
                </div>    
            </div>

            <div style={{display:(display===''?'block':'none')}} className='opacityBackgrond'>
                {passwordPeg==='current'?<Current/>:passwordPeg==='new'?<New/>:<Done/>}
            </div>
        </>

    );
}

export default UserDetails;
