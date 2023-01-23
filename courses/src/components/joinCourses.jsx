import React from 'react';
import { useEffect } from 'react';
import { CoursesContext } from '../helpers/context';
import { useContext } from 'react';
import decode from 'jwt-decode';
import App from './../App';
import Python from './password Change/courses/python';

const MyCourses = () => {

    const {form,setForm,setPage,signUp,url,hidden,setHidden,display,setDisplay,deleteCourse,getSubjects,subjectsList,setSubjectsList,addCourse,course,setCourse,id,setId,switc,switchDot}=useContext(CoursesContext);

    const handleClick=async()=>{
        console.log(form);
        setDisplay('none');
        const result=await addCourse(url+'courses',{subject:form.subject,id:(decode(localStorage.getItem('token'))).id});
        if (result==='failed')setHidden('notHidden');
        else{
        setForm({}); 
        setHidden('hidden')
        setPage('myCourses')
        }    
        
    }

    return (
        <>
            <div className='joinCourses'>

                <div className={`dot ${switc}`} ></div>

                <div className='joinCourseDis'>

                        {subjectsList.map((subject,index)=>

                            <div className='barPicsContainer'>
                                <button className='imageButton' onClick={()=>{setHidden('hidden');console.log(index);switchDot(index); return}}><img className='barPics' src={subject.pics} style={{width:"100%"}}></img></button>
                            </div>   
                        )}

                </div>

                    <article className={`joinInc ${hidden}`}>You can't enter a course you're already in!</article>

            <div className='courseDispaly'>

                <Python/>

            </div>
            </div>


            <div style={{display:(display===''?'block':'none')}} className='opacityBackgrond'>

                <div className='joinPopUp'>
   
                    <article>You are about to enter a course. Are you ready?</article>

                    <div className='joinButtonContainer '>
                        <button className='joinButton m-4' onClick={handleClick}>Yes</button>
                        <button className='joinButton m-4' onClick={()=>setDisplay('none')}>Let me think about it</button>
                    </div>
                </div>

            </div>

        </>
    );
}

export default MyCourses;
