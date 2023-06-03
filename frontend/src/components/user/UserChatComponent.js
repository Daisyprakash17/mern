import React from 'react'
import "../../chat.css"
import { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import {useSelector} from 'react-redux'
export default function UserChatComponent() {

    // we will create the state variable socket which will be used to send/reciece the message
    const [socket,setsocket]=useState(false);
    const [chat,setchat]=useState([]);
    const [messageRecieved,setmessageRecieved]=useState(false);
    const [chatconnectioninfo,setchatconnectioninfo]=useState(false);
    const [reconnect,setreconnect]=useState(false);
    const userinfo=useSelector((state)=>state.userRegisterLogin.userinfo)
    useEffect(()=>{
      if(!userinfo.isAdmin)
      {
        setreconnect(false);
        var audio =new Audio('/audio/chat-msg1.mp3');
        const socket =new socketIOClient();
        socket.on("no admin",(msg)=>{
          console.log('no admin is called ');
          setchat((chat)=>{
            return [...chat,{admin:"Admin OFFline!!"}]
          })
        })
        socket.on('server sends message from admin to client',(message)=>{ 
          setchat((chat)=>{
            return [...chat,{admin:message}]
          })
          setmessageRecieved(true);
          audio.play();
          const chatMessages = document.querySelector(".cht-msg");
          chatMessages.scrollTop = chatMessages.scrollHeight;
        })
        setsocket(socket);
          socket.on('admin closed chat',()=>{
            setchat([]);
            setchatconnectioninfo("Admin chosed chat, Type something and submit to reconnect");
            setreconnect(true);
          })
        return ()=>socket.disconnect(); // on closing the component the socket will be closed 
      }
    
    },[userinfo.isAdmin,reconnect]) 

    const clientSubmitChatMsg=(e)=>{
      if(e.keyCode && e.keyCode !==13)
      {
        return ;
      }
      setchatconnectioninfo("");
      setmessageRecieved(false);
      const msg=document.getElementById("clientChatMsg");
      const temp=msg.value.trim();
      if(temp==="" || temp===null || temp===false || !temp)
      return ;
      socket.emit('client sends message',temp);
      setchat((chat)=>{
        return [...chat,{client:temp}];
      })

      msg.focus();
    setTimeout(() => {
         msg.value = "";
         const chatMessages = document.querySelector(".cht-msg");
         chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 50)
    }
  return ( userinfo && userinfo.isAdmin===false) ? (
    <>
    <input type="checkbox" id="check"/>
    <label className='chat-btn' htmlFor='check'>
    <i className="bi bi-chat-dots comment"></i>
    {messageRecieved && (
      <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle" ></span>
    )}
    <i className="bi bi-x-circle close"></i>
    </label>
    
    <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Let's Chat - Online</h6>
        </div>
        <div className="chat-form">
          <div className="cht-msg">
            <p style={{color:'red'}}>{chatconnectioninfo}</p>
           {chat.map((msg,idx)=>{
            return <div key={idx}>
            {msg.client && (

              <p style={{backgroundColor:"#39BAF4",marginLeft:'60px',borderRadius:'20px',padding:'10px'}}> 
              <b>User  : </b>{msg.client}
              </p>
            )}
            {msg.admin && (

              <p style={{backgroundColor:"#FDE93B",marginRight:'60px',borderRadius:'20px',padding:'10px'}}> 
              <b>Admin  : </b>{msg.admin}
              </p>
            )}
          
          </div>

           })} 
          


          </div> 
          <textarea
            id="clientChatMsg"
            className="form-control"
            placeholder="Your Text Message"
            onKeyUp={(e)=>{clientSubmitChatMsg(e)}}
          ></textarea>

          <button className="btn btn-success btn-block" onClick={(e)=>{clientSubmitChatMsg(e)}}>Submit</button>
        </div>
      </div>
    </>
  ):null
}
