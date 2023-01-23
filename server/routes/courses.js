const express=require('express');
const {client,addCourse,deleteCourse,getUserCourses}=require('../model/client');
const router=express.Router();
const auth=require('../middlewares/auth');

router.get('/',async(req,res)=>{

 const sql="SELECT * FROM courses";

 try{

    const result= await client.query(sql);
    res.send(result.rows);

 }
 catch(err){

    console.log(err);
    res.status(400);

 }

})

router
.route('/')
.post(auth,addCourse)
.put(deleteCourse);

router
.route('/getCoursesById')
.post(auth,getUserCourses)

module.exports=router;