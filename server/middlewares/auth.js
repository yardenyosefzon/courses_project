const jwt=require('jsonwebtoken');

module.exports=auth=(req,res,next)=>{

    let token=req.headers['x-auth-token'];
    
    if(!token)return res.status(401).send('Access denied, sign in to gain access');

    try{

        jwt.verify(token,'Token MF');
        next();
    
        }
    
    catch{
        
        res.status(400).send('Token invalid');

    }

}

