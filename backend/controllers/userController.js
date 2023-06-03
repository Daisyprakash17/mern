
const User=require('../models/UserModel')
const Product=require('../models/ProductModel')
const Review=require('../models/ReviewModel')
const {hashPassword ,comparePassword}=require('../utils/hashPassword')
const generateAuthToken=require('../utils/generateAuthToken')
exports.getusers=async(req,res,next)=>{
    try{
            const users=await User.find({}).select("-password");
            res.status(201).json(users);
    }catch(err)
    {
        next(err);
    }
    
} 
exports.registeruser=async(req,res,next)=>{

    try{    
        const {name,lastName,email,password}=req.body; 

            if(!name || !lastName || !email || !password)
            {
                res.status(400).send('Name lastName email and password all should be provided');
            }

            const userexits=await User.findOne({email:email});
            if(userexits){
            res.status(400).send('user already exists');
            }
            else
            { 
                const hashedPassword=hashPassword(password);
                email.toLowerCase(); 
                const user=await User.create({
                    name:name,
                    lastName:lastName,
                    email:email,
                    password:hashedPassword
                }) 
                const jwt_token=generateAuthToken(user._id,user.name,user.lastName,user.email,user.isAdmin);
                res.
                cookie("access_token",jwt_token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict"})
                .status(201).
                json({message:"User created",userCreated:{_id:user._id,name:user.name,lastName:user.lastName,email:user.email,isAdmin:user.isAdmin}});
            }



    }catch(err)
    {
            next(err);
    }   
}

exports.loginuser=async(req,res,next)=>{

    try{

        const {email,password,doNotLogout}=req.body;
        if(!email || !password)
        {
            res.status(400).send('Email and password both are required ');
        }
        const user=await User.findOne({email:email}); 
        if(user && comparePassword(password,user.password))
        {
            // here we will compart the given password and save password in the database
            let cookieParams={httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict"};
            if(doNotLogout)
            cookieParams={...cookieParams,maxAge:1000*60*60*24*7}; // maxAge is the age of the cookies after that cookies will expires
            
            const jwt_token=generateAuthToken(user._id,user.name,user.lastName,user.email,user.isAdmin);
            return res
                    .cookie('access_token',jwt_token,cookieParams)
                    .json({message:"user logged in !",userloggedIn:{_id: user._id, name: user.name, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin, doNotLogout}});
             
            
        }
        else
        {
            res.status(401).json({message:'wrong credentials'});
        }

    }catch(err)
    {
        next(err);
    }

}


exports.updateUserDetails=async(req,res,next)=>{

    try{ 
        const user = await User.findById(req.user._id).orFail();

    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName; 
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;
    
    // if new password is provide that will update the password in the database
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }

    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
    }catch(err)
    {
        next(err);
    }
}

exports.getUserProfile=async(req,res,next)=>{

        try{
                const user=await User.findById(req.params.id).select("-password").orFail();
                res.send(user);
        }catch(err)
        {
            next(err);
        }

}

exports.writeReview=async(req,res,next)=>{
    try{
            const session=await Review.startSession();
            const {comment,rating}=req.body; 
            if(!comment || !rating )
            res.status(400).send('all inputs are required');
            
            const objectId=require('mongodb').ObjectId;
            const reviewId=objectId();
            session.startTransaction();
            await Review.create([
                {_id:reviewId,
                comment:comment,
                user:{_id:req.user._id,name:req.user.name+" "+req.user.lastName},
                rating:rating}
            ],{session:session})
            const product=await Product.findById(req.params.productId).populate('reviews').session(session);

            // if already reviewed the product then cannot review again
            let alreadyReviewed =false;
             product.reviews.map((r) => {
                if(r.user._id.toString() === req.user._id.toString())
                    alreadyReviewed=true;   
            })

        if (alreadyReviewed) {
            await session.abortTransaction();
            session.endSession();
            return res.status(200).send("product already reviewed");
        }

            let temp=[...product.reviews];
            temp.push({rating:rating});
            product.reviews.push(reviewId);

            if(product.reviews.length===1)
            {
                product.rating=Number(rating);
                product.reviewsNumber=1

            }
            else
            {
                let sum=0;
                const count=product.reviews.length;
                temp.map((item)=>{
                    sum=sum+Number(item.rating);
                })
                product.rating=Math.round(sum/count);
                product.reviewsNumber=product.reviews.length;
            }
            await product.save();
            await session.commitTransaction();
            session.endSession();
 
                res.send("review added to the product");
    }catch(err)
    {
        await session.abortTransaction()
        next(err);
    }

}

exports.getuser=async(req,res,next)=>{

    try{
        const user=await User.findById(req.params.id).select('name lastName email isAdmin').orFail();
        res.send(user);
    }catch(err)
    {
        next(err);
    }
}
exports.updateuser=async(req,res,next)=>{
    try{
            const user=await User.findById(req.params.id); 

            user.name=req.body.name || user.name;
            user.lastName=req.body.lastName || user.lastName;
            user.email=req.body.email || user.email;
            user.isAdmin=req.body.isAdmin;
            await user.save(); 
            res.send('user updated');
    }catch(err)
    {
        next(err);
    }
}


exports.deleteuser=async(req,res,next)=>{

    try{
        const user=await User.findByIdAndRemove(req.params.id);
        res.send('user deleted');
    }catch(err){
        next(err);
    }
}