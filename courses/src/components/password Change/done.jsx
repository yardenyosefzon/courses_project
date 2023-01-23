import React from 'react';
import { CoursesContext } from '../../helpers/context';
import { useContext } from 'react';
import { useEffect } from 'react';

const Done = () => {
    const {setForm,form,hidden,setHidden,setDisplay,logIn,email,ending,url,setPasswordPeg,idePass,identicle,changePassword}=useContext(CoursesContext);
    
    return (
        <div className='donePopUp'>
            <article className='donePar'>Your password was updated succesfully </article>
            <button className='doneBack' onClick={()=>{setDisplay('none');setPasswordPeg('current');return}}>Go Back</button>
        </div>
    );
}

export default Done;
