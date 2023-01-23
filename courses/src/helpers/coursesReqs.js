import axios from 'axios';

export const logIn=async(url,body)=>{

    const result=await axios.post(url,body);
    return (result.data);

}

export const signUp=async(url,body)=>{

    const result=await axios.post(url,body);
    return {data:result.data,token:result.headers['x-auth-token']};

}

export const getCoursesById=async(url,id)=>{

    const result=await axios.post(url,{id:id},
        {
            headers:{'x-auth-token':localStorage.getItem('token')}
        });
    return(result);

}

export const deleteCourse=async(url,body)=>{
    
    const result=await axios.put(url,body);
    return(result);

}

export const getSubjects=async(url)=>{

    const result=await axios.post(url);
    return(result.data);

}

export const addCourse=async(url,body)=>{

    try{
    const result=await axios.post(url,body,
        {
            headers:{'x-auth-token':localStorage.getItem('token')}
        });
    return result;
    }
    catch{

        return 'failed';

    }
}

export const getUserById=async(url,body)=>{

    try{
    const result=await axios.post(url,body)
    return result;
    }
    catch{

        return 'failed';

    }
}

export const changePassword=async(url,body)=>{

    try{
    const result=await axios.put(url,body)
    return (result.data);
    }
    catch{

        return 'failed';

    }
}




