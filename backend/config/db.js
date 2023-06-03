require ('dotenv').config();

const mongoose=require('mongoose');

const connectDB=async()=>{
        try{ 
            await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true})
            console.log('Successfully connected to the mongoDB DataBase');
        }catch(err){
                console.error('mongoDB connetion FAIL')
                console.log(err);
        }

}
module.exports=connectDB