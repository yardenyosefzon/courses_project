import React from 'react';
import { CoursesContext } from '../../helpers/context';
import { useContext } from 'react';

const Current = () => {

    const {setForm,form,hidden,setHidden,setDisplay,logIn,email,ending,url,setPasswordPeg}=useContext(CoursesContext);

    const handleClick=(e)=>{

        let token=logIn(url+ending,{email:email,password:form.password});
        setForm({});
        token
        .then((result)=>{

            setPasswordPeg('new');
            setHidden('hidden');

        })
        .catch(()=>{

            setHidden('notHidden');

        })

    }

    return (
        <div className='cerruntPasswordPopUp'>
            <article className='cerruntPar'>Enter your current password</article>
            <input type="password" className="form-control cerruntInput"  onChange={(e)=>{setForm({...form,password:e.target.value})}}></input>
            <article className={`${hidden} cerruntInc`}>Password is incorrect</article>
            <button className='submitCurrent' onClick={handleClick}>Submit</button>
            <button className='goBackCurrent' onClick={()=>{setDisplay('none')}}>Go Back</button>
        </div>
    );
}

export default Current;
