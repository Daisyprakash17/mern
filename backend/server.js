const {createServer} =require('http')
const {Server}=require('socket.io')
const express =require("express")
const fileUpload=require('express-fileupload')
const cookieParser=require('cookie-parser');
// const port=4000;
const apiRoutes=require('./routes/apiRoutes')

const app=express();

const httpserver=createServer(app); // create a httpsever from object of express


global.io=new Server(httpserver); // we need io variable in other file also so making it global

app.use(fileUpload()); // this module is used so that express can process the uploded files
app.use(cookieParser()); // this module is used so that express send and read the cookie from the server/browser
app.use(express.json()) // this module is used so that express can send and recieve the json data from client to server and vive-versa


// mongodb Database connection
const connectDB=require('./config/db'); 
connectDB();

app.use('/api',apiRoutes);

// on connection we will call the call-back function 
// socket.on this will be call on specific event lik "client send message"
// which means client will use this event to send the message the server
// here client both admin and normal users both are client so 
// both can use this event "client sends message" to send the message to the server
const admins=[];
let activeChats=[];
function get_random(array) {
    return array[Math.floor(Math.random() * array.length)]; 
 }
 
io.on('connection',(socket)=>{
    socket.on("client sends message",(msg)=>{

        if(admins.length===0)
        {
            socket.emit('no admin',"");
        }
        else{

            // here server have recieced the message the on of the client
            // no have to send this message to the targeted reviever client 
            // so here server will broadcast this message to all the client except the client which have send this message to the server
            // console.log('the message from the client is ',message);
            let client = activeChats.find((client) => client.clientId === socket.id);
        let targetAdminId;
        if (client) {
           targetAdminId = client.adminId; 
        } else {
           let admin = get_random(admins); 
        //    console.log('the admins avilable are ',admins)
           activeChats.push({ clientId: socket.id, adminId: admin.id });
           targetAdminId = admin.id;
        //    console.log('the active chats are ',activeChats
        }
      socket.broadcast.to(targetAdminId).emit("server sends message from client to admin", {
          user: socket.id,
        message: msg,
      });
        }
    })
    socket.on("admin sends message", ({ user,message })=>{
        // here servesr have reavieve the message on from the admin
        // now here server will send  send the message to all the cliend (buyers and admin both are client)
        socket.broadcast.to(user).emit("server sends message from admin to client",message)
    })
    socket.on('admin connected with server',(adminName)=>{
        admins.push({id:socket.id,admin:adminName});
    })

    socket.on('admin closes chat',(socketId)=>{
        socket.broadcast.to(socketId).emit('admin closed chat',"")
        let c=io.sockets.sockets.get(socketId);
        c.disconnect();
    })
    socket.on('disconnect',(reason)=>{ 
            // if admin disconnected 
            const removeIndex=admins.findIndex((item)=>item.id===socket.id);
            if(removeIndex!==-1){
                admins.splice(removeIndex,1);
            }
            activeChats=activeChats.filter((item)=>item.adminId!==socket.id);

             // if client disconnected
    const removeIndexClient = activeChats.findIndex((item) => item.clientId === socket.id);
    if (removeIndexClient !== -1) {
       activeChats.splice(removeIndexClient, 1); 
    }
    socket.broadcast.emit("disconnected", { reason: reason, socketId: socket.id });
    })
})




// this is the first middleware function 
app.use((req,res,next)=>{
    console.log('this is the first middleware fuctions');
    next()
})

// app.get('/',async(req,res,next)=>{
//    res.send('this is the home page');
// })

 
 const path=require('path')
 if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/build")));
    app.get("*",(req,res)=>res.sendFile(path.resolve(__dirname,"../frontend","build","index.html")))
 }else{
    app.get('/',(req,res)=>{
        res.json({message:"API running..."})
    })
 }


 // this is our own global error handling middleware function
 // this is to print the error in the console 
 app.use((error, req, res, next) => {
    if(process.env.NODE_ENV==='development')
    {
        console.error(error);
    }
    next(error)
})

// this is used to send the error the server
app.use((error, req, res, next) => {
    if(process.env.NODE_ENV==='development')
    {
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    }
    else
    {
        res.status(500).json({message:error.message})
    }
})

// app.listen(port,()=>{
//     console.log('server is listening');
// })

const PORT =process.env.PORT || 4000;
httpserver.listen(PORT,()=>{
    console.log(`server is running on port ${PORT} `)
})