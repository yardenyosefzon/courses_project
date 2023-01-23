const express=require('express');
const client=require('../model/client');
const router=express.Router();
const {getSubjects}=require('../model/client');

router
.route('/')
.post(getSubjects)



module.exports=router;