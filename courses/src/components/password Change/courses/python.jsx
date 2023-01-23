import React from 'react';
import { CoursesContext } from '../../../helpers/context';
import { useContext } from 'react';
import { useEffect } from 'react';

const Python = () => {

    const {subjectsList,id,setId,form,setForm,setDisplay}=useContext(CoursesContext);

    useEffect(() => {
        }

    , [subjectsList,id]);

    return (
        <div className='coursePage'>

            <img className={id===0?'pythonPic':id===1?'dockerPic':id===2?'javaPic':id===3?'javascriptPic':id===4?'reactPic':id===5?'sqlPic':'mongoPic'} src={id===0?'pics/python_big.jpg':id===1?'pics/docker_big.png':id===2?'pics/java_big.png':id===3?'pics/javascript_big.png':id===4?'pics/react_big.png':id===5?'pics/sql_big.jpg':'pics/mongo_big.png'} alt="lll" />
    
            <div className='courseDetails'>

                <div className='courseSubject'>

                        <article>{subjectsList[id].subject}</article>

                </div>

                <div className='courseDescription'>

                        <article>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur atque corrupti laborum laudantium, sint repellat, ipsam odit saepe ab ullam nemo amet minima assumenda quas dolores praesentium numquam consequatur sequi sed itaque id voluptatem. Ullam est mollitia esse obcaecati iste id, a, ipsam totam ea accusantium recusandae hic officia, repellendus atque nobis molestias eos quae quia explicabo facere. Sit iusto quisquam fugiat odio hic eligendi consequuntur ab rem autem, modi blanditiis officiis repellendus recusandae est saepe magni laborum nemo voluptatibus eaque architecto ex, assumenda voluptate. Excepturi tempore asperiores ex porro hic tenetur dolores, nulla placeat minus temporibus qui nemo velit!</article>

                </div>

                <div className='courseRatingContainer'>
                    <div>
                        <article className='courseRatingHeader'>Rating:</article>
                    </div>
                    <div>
                        <article className='courseRating'>{subjectsList[id].rating}</article>
                    </div>
                </div>

                <div className='courseLevelContainer'>
                    <div>
                        <article className='courseLevelHeader'>Level:</article>
                    </div>
                    <div>
                        <article className='courseLevel'>{subjectsList[id].level}</article>
                    </div>
                </div>
                
                <div className='joinButtonCourseContainer'>

                    <button className='joinButtonCourse' onClick={()=>{setForm({subject:subjectsList[id].subject}); setDisplay(''); return}}>Join course</button>

                </div>


            </div>

        </div>
    );
}

export default Python;
