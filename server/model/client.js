const Joi = require('joi');
const {Client} =require('pg');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const client=new Client({

    user:'postgres',
    host:'localhost',
    database:'Courses',
    password:'YAL4312',
    port:5432

})

client.connect();

//////////TOKEN

const tokenGen=(id,name,email)=>{

    return jwt.sign({id:id,name:name,email:email},'Token MF');

}

////////////USERS

const validUser=(body)=>{

    schema=Joi.object({

        users:Joi.string().required().regex(/^[A-Z][a-zA-Z]{1,}(?: [A-Z][a-zA-Z]*){0,2}$/),
        password:Joi.string().required(),
        email:Joi.required(),
        
    })

    return schema.validate(body);
}

const logIn=(async(req,res)=>{

    const body=req.body;

    const sql=`SELECT * FROM users
                WHERE email=$1`;

    const values=[body.email,body.password];

    try{

        const rows=await userEmail(values[0]);
        if(!rows)return res.status(400).send('Wrong details')

        if(rows.length!==0){
            
            const password=await bcrypt.compare(values[1], rows.password);
            
            if(password===false)return res.status(400).send('Wrong details'); 

            const token=tokenGen(rows.users_id,rows.users,rows.email);
            res.send(token);

        }
        else{

            res.status(400).send('Wrong details');

        }
    }
    catch(err){
        
        res.status(400).send(err.message);

    }

})

const addUser=(async(req,res)=>{

    const body={email:req.body.email,users:req.body.users,password:req.body.password};

    let {error}=validUser(body);
    if(error)return res.status(400).send(error)
    
    const sql="INSERT INTO users (users, password, email) values($1,$2,$3) RETURNING * ";
    const values=[req.body.users,req.body.password,req.body.email]

    const salt=await bcrypt.genSalt(10);
    values[1]=await bcrypt.hash(values[1],salt);
    
    try{

        const {rows}= await client.query(sql,values);
        console.log( rows)
        const token=tokenGen(rows[0].users_id,rows[0].users,rows[0].email);

        res
        .header("x-auth-token",token)
        .header('access-control-expose-headers','x-auth-token')
        .send(rows[0]);

    }
    catch(err){
        
        res.status(400).send(err.detail);
        
    }

})

const userEmail=(async(email)=>{

    const sql=`SELECT * FROM users
                WHERE email=$1`;

    try{
        let {rows}=await client.query(sql,[email]);
        return rows[0];
    }
    catch(err){

        return err.message;

    }
    

})

const userId=(async(req,res)=>{

    const body=req.body;

    const sql=`SELECT * FROM users
                WHERE users_id=$1`;

    const value=[body.id];

    try{
    let user=await client.query(sql,value);
    return res.send(user.rows[0])
    }
    catch(err){
        res.status(400).send(err.messeage);
    }

})

const changePassword=(async(req,res)=>{
    
    const body=req.body;
    
    const sql=`UPDATE users
                SET password=$2
                WHERE email=$1
                RETURNING *`;

    const values=[body.email,body.password];

    const salt=await bcrypt.genSalt(10);
    values[1]=await bcrypt.hash(body.password,salt);
    

    try{
    let user=await client.query(sql,values);
    return res.send(user.rows[0]);
    }
    catch(err){
        res.status(400).send(err.messeage);
    }
})

/////////SUBJECTS

const validSubject=(body)=>{

    schema=Joi.object({

        subject:Joi.string().required(),
        rating:Joi.number().min(0).max(5).required(),
        level:Joi.string().required()
        
    })

    return schema.validate(body);
}

const addSubject=(async(req,res)=>{

    const body=req.body;

    const {error}=validSubject(body);
    if(error)return res.status(400).send(error.details[0].message);

    const sql="INSERT INTO subjects (subject, rating, level) values($1,$2,$3) RETURNING * ";
    
    const values=[body.subject,body.rating,body.level]

    try{

        const {rows}= await client.query(sql,values);
        res.send(rows[0]);

    }
    catch(err){

        res.send(err);
        console.log(err);
        
    }

})

const getSubjects=(async(req,res)=>{

    const sql=`SELECT subject, rating, level, pics FROM subjects`;

    try{
        
        const {rows}= await client.query(sql);
        res.send(rows);

    }
    catch(err){

        res.send(err);
        
    }

})

//////COURSES

const countCourse=(async(id)=>{

    const getCount=`SELECT COUNT (*) FROM courses
                    WHERE subject_id=$1`;

    let {rows}=await client.query(getCount,[id]);
    return rows[0].count;
    

})

const getUserCourses=(async(req,res)=>{

    const getCourses=`SELECT course,subject FROM courses                
                        FULL OUTER JOIN subjects On courses.subject_id=subjects.subject_id
                        where users_id=$1 `;

    let {rows}=await client.query(getCourses,[req.body.id]);
    return res.send(rows);
    

})

const addCourse=(async(req,res)=>{

    const body=req.body;
    const values=[body.subject,body.id]  

    const checkNull=`SELECT * FROM courses
                    WHERE users_id IS NULL and subject_id=$1
                    LIMIT 1`;

    const insertNull=`UPDATE courses
                    SET users_id=COALESCE(users_id,$1)
                    WHERE course_id=$2
                    RETURNING *`;

    const checkUser=`SELECT users_id FROM courses
                    WHERE subject_id=$1 and users_id=$2 `;

    const getSUbId=`SELECT subject_id FROM subjects
                    WHERE subject=$1`;

    const insertCourse=`INSERT INTO courses (course, users_id, subject_id, course_index) 
                        values($1,$2,$3,$4) RETURNING *`;

    try{
        ///////check subject id from course name
        let {rows}=await client.query(getSUbId,[values[0]]);
        if(rows.length===0)return res.status(400).send('No subject was found');
        else values.push(rows[0].subject_id);

        /////////check if user exsits in course
        rows=await client.query(checkUser,[values[2],values[1]]);
        if(rows.rows.length!==0)return res.status(400).send('You are allready signed to this course')

        ////////check if theres null values in courses
        rows=await client.query(checkNull,[values[2]]);
        if(rows.rows.length!==0){
            ///////insert user id instead of null
            rows=await client.query(insertNull,[values[1],rows.rows[0].course_id]);
            res.send(rows.rows)
        }
        else{

            /////////creating new row
            let count=countCourse(values[2]);
            count.then(async(result)=>{
            
            values.push(parseInt(result)+1);
            values[0]+=Math.floor(result/3)+1;
            console.log(values)
            rows=await client.query(insertCourse,values);
            res.send(rows.rows[0]);
        })
        
    }
    }   
    catch(err){
        
        res.status(400).send(err);

    } 

})

const deleteCourse=(async(req,res)=>{

    const body=req.body;

    const deleteCourse=`UPDATE courses  
                        SET users_id=null
                        WHERE course=$1 and users_id=$2
                        RETURNING *`

    const values=[body.course,body.id];

    try{

        let {rows}=await client.query(deleteCourse,values);
        if(rows.length!==0)return res.status(200).send('deleted')
        else return res.status(400).send('Did not find an object with this details');
            
        }

    catch(err){

        res.send(err);

    }

})

module.exports={client,addUser,userEmail,userId,addSubject,addCourse,deleteCourse,logIn,getUserCourses,getSubjects,changePassword};