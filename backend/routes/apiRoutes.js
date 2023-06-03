const express =require('express');
const app =express.Router();

const productRoutes=require('./productRoutes');
const categoryRoutes=require('./categoryRoutes');
const orderRoutes=require('./orderRoutes');
const userRoutes=require('./userRoutes');
const jwt=require('jsonwebtoken')
app.get('/',(req,res)=>{
    res.send('this is the first route of the api router')
}) 
app.get('/logout',(req,res)=>{
    console.log("logout out is called ");
    return res.clearCookie("access_token").send('acess token cleared');
})

// this is the end point which will be used to check whether the current token is valid or not 
app.get('/get-token',(req,res)=>{
    try{ 
        const accessToken=req.cookies['access_token']; 
        const decoded=jwt.verify(accessToken,process.env.JWT_SECRET_KEY); 
        res.json({token:decoded.name,isAdmin:decoded.isAdmin})
    }catch(err){
        res.status(401).send('Unauthorized. Invalid Token');
    }
})
app.use('/products',productRoutes);
app.use('/categories',categoryRoutes);
app.use('/users',userRoutes);
app.use('/orders',orderRoutes);

module.exports=app;