import React from 'react';
import { useEffect } from 'react';
import { CoursesContext } from '../helpers/context';
import { useContext } from 'react';
import decode from 'jwt-decode';
import App from './../App';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {

    const {getSubjects,setSubjectsList,form,setForm,signUp,url,ending,setEnding,hidden,setHidden,name,setName,idePass,getCoursesById,userList,setUserList,display,setDisplay,deleteCourse,getUserList,delet,setDelet}=useContext(CoursesContext);

    const navigate=useNavigate()

    useEffect(() => {

        getUserList();

        const result= getSubjects(url+'subjects');
        result.then((result)=>{
            setSubjectsList(result);
            })
        }

    , [hidden,form]);

    const handleClick=async()=>{
        
        setHidden('')
        setDisplay('none');
        setForm({});
        setTimeout(async() => {
            
            await deleteCourse(url+'courses',form)  
            
            setTimeout(() => {
            
                setDelet(-1);
                navigate('/home');
                
                
            },400)
            setHidden('hidden')

        }, 1000);
        
    }

    return (
        <>
            <div className='myCourses'>

                <div className='myParContainer'>
                    <article className='myPar'>My courses</article>
                </div>

                {userList.length===0?<div className='noCourses'><article className='myPar'>No courses here</article></div>:null}

                <div className='courseDis'>

                        <div className='tableHeader'>

                            <div className='tableName'><article>Course name</article></div>
                            <div className='tableSubject'><article>Course subject</article></div>

                        </div>

                        {userList.map((course,index)=>

                                <div className={(delet===index)&&(hidden==='')?'rowTable rowDelete':'rowTable'}>

                                    <div className='rowCourseContainer'>
                                        <article>{course.course}</article>
                                    </div>
                                    <div className='rowSubjectContainer '>
                                        <article>{course.subject}</article>
                                    </div>
                                    <div className='rowExitButtonContainer'>
                                        <button className='exitButton' onClick={()=>{setDisplay('');setDelet(index);setForm({course:course.course,id:(decode(localStorage.getItem('token')))['id']})}}>Exit</button>
                                    </div>

                                </div>   

                        )}

                </div>

            </div>

            <div style={{display:(display===''?'block':'none')}} className='opacityBackgrond'>

                <div className='exitPopUp'>
   
                    <article>Are you sure you want to exit from this course? Your position will be given to someone else.</article>

                    <div className='exitButtonContainer '>
                        <button className='exitButton m-4' onClick={handleClick}>Yes</button>
                        <button className='exitButton m-4' onClick={()=>setDisplay('none')}>Let me think about it</button>
                    </div>
                </div>

            </div>

        </>
    );
}

export default MyCourses;
