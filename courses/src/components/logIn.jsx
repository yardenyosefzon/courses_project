import React from 'react';
import { CoursesContext } from '../helpers/context';
import { useContext } from 'react';
import decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

const LogIn = () => {

    const {form,setForm,logIn,url,ending,setEnding,name,setName,hidden,setHidden,setEmail}=useContext(CoursesContext);

    const navigate=useNavigate();

    const handleSubmit=(e)=>{

        e.preventDefault();
        e.target.reset();
        let token=logIn(url+'users',form);
        setForm({});
        token
        .then((result)=>{

            const details=decode(result);
            localStorage.setItem('token',result);
            setName(details.name);
            setEmail(details.email)
            setHidden('hidden');
            navigate('/home')

        })
        .catch(()=>{

            setHidden('')

        })

    }
    
    return (
        <div className='logInPage'>
            <article className='hoverDi'>Hover above me -></article>
            <div className='logoLogIn'>YO-Courses</div>

            <div className='logInFormContainer'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control"  onChange={(e)=>{setForm({...form,email:e.target.value})}}></input>
                    </div>
                    <div className="">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e)=>{setForm({...form,password:e.target.value})}}></input>
                    </div>
                    <article className={`${hidden} logInInc`}>Email or password are incorrect</article>
                    <button className='logInButton'>Submit</button>
                    <div className='logInlinkContainer'> 
                        <a className='m-5' href="/signUp" onClick={()=>{setHidden('hidden');return}}>Dont have a user? Sign up</a>
                    </div>
                </form>
            </div> 
        </div>   
    );
}

export default LogIn;
