const express=require('express');
const users=require('./routes/users');
const subjects=require('./routes/subjects');
const courses=require('./routes/courses');
const cors=require('cors');

const app=express('');
const port=4000;

app.use(cors());
app.use(express.json());
app.use('/api/users',users);
app.use('/api/subjects',subjects);
app.use('/api/courses',courses);


app.listen(port,()=>{console.log('Hi')});

