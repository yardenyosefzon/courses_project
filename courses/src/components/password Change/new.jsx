import React from 'react';
import { CoursesContext } from '../../helpers/context';
import { useContext } from 'react';
import { useEffect } from 'react';

const New = () => {

    const {setForm,form,hidden,setHidden,setDisplay,logIn,email,ending,url,setPasswordPeg,idePass,identicle,changePassword}=useContext(CoursesContext);

    useEffect(() => {

        idePass(form['password'],form['cpassword']);

    }, [form]);

    const handleClick=async()=>{
        if(identicle==='identicle'){

            setForm({});
            const result=await changePassword(url+'users',{password:form.password,email:email})
            if(result){
            setPasswordPeg('done');
            setHidden('hidden');
            }
            else{
            setHidden('notHidden');
            }
        }
    }

    return (
        <div className='newPasswordPopUp'>
            <article className='newPar'>Enter a new password</article>
            <input type="password" className="form-control newInput"  onChange={(e)=>{setForm({...form,password:e.target.value})}}></input>
            <article className='newPar'>Confirm the password</article>
            <input type="password" className="form-control newInput"  onChange={(e)=>{setForm({...form,cpassword:e.target.value})}}></input>
            <article className={`${identicle} newInc`}>Passwords are not identicle</article>
            <button className='submitNew' onClick={handleClick}>Submit</button>
            <button className='goBackNew' onClick={()=>{setDisplay('none');setPasswordPeg('current');return}}>Go Back</button>
        </div>
    );
}

export default New;
