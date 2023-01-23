const express=require('express');
const {client,addUser,userEmail,userId,logIn,changePassword}=require('../model/client');
const router=express.Router();

router
.route('/')
.post(logIn)
.put(changePassword);

router
.route('/addUser')
.post(addUser);

router
.route('/userEmail')
.post(userEmail)

router
.route('/userId')
.post(userId)
module.exports=router;