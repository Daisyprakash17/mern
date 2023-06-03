const jwt=require('jsonwebtoken')
const verifyisloggedIn=async(req,res,next)=>{
     
    try{ 
        const token=req.cookies.access_token;
        if(!token)
        {
            res.status(403).send('A token is required for authentication')
        }
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user=decoded;
              next();
        }catch(err)
        {
            res.status(401).send("Unautorized: Invalid token");
        } 
    }catch(err)
    {
        next(err);
    }
}
const verifyisAdmin=async(req,res,next)=>{
   
    if(req.user && req.user.isAdmin)
    {
        next();
    }
    else
    {
        res.status(401).json("Unautorized: Admin requied");
    }
}
module.exports={verifyisloggedIn,verifyisAdmin}