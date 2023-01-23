import React from 'react';
import { useEffect } from 'react';
import { CoursesContext } from '../helpers/context';
import { useContext } from 'react';
import decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const {form,setForm,signUp,url,ending,setEnding,name,setName,hidden,setHidden,idePass,identicle,setIdenticle,setEmail}=useContext(CoursesContext);

    const navigate=useNavigate();

    useEffect(() => {

        idePass(form['password'],form['cpassword']);

    }, [form]);

    const handleSubmit=(e)=>{

        e.preventDefault();

        if(identicle==='identicle'){
            let token=signUp(url+'users/addUser',form);
            
        token
        .then((result)=>{
                
            localStorage.setItem('token',result.token)
            setName(result.data.users);
            setEmail(result.data.email);
            setForm({});
            setHidden('hidden');
            setEnding('courses/getCoursesById');
            e.target.reset();
            navigate('/home')

        })
        .catch(()=>{

            setHidden('notHidden')

        })
    }
    }
    
    return (
        <div className='logInPage'>

            <div className='logoSignUp'>YO-Courses</div>

            <article className='joinAnimation'>Join courses</article>
            <article className='easyAnimation'>Easily</article>
            <article className='imedAnimation'>Imediatlly</article>
            
            <div className='signUpFormContainer'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control"  onChange={(e)=>{setForm({...form,email:e.target.value})}}></input>
                        <div className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Full name</label>
                        <input type="text" className="form-control" pattern='^[A-Z][a-zA-Z]{1,}(?: [A-Z][a-zA-Z]*){0,2}$'  onChange={(e)=>{setForm({...form,users:e.target.value})}}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e)=>{setForm({...form,password:e.target.value})}}></input>
                    </div>
                    <div className="">
                        <label className="form-label">Confirm password</label>
                        <input type="password" className="form-control" onChange={(e)=>{setForm({...form,cpassword:e.target.value})}}></input>
                    </div>
                    <article className={`${hidden} logInInc`}>This email adress is already signed up</article>
                    <article className={`${identicle} signUpIde`}>Passwords are not identicle</article>
                    <button className={`logInButton`}>Submit</button>
                    <div className='logInlinkContainer'> 
                        <a className='m-5' href="/" onClick={()=>{setHidden('hidden');setIdenticle('identicle'); return}}>Already have a user? Log in</a>
                    </div>
                </form>
            </div> 
        </div>   
    );
}

export default SignUp;
