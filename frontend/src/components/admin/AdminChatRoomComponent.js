import React, { useEffect, useState } from 'react'
import { Toast } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { setMessageRecieved } from '../../redux/actions/chatActions'
import { useDispatch } from 'react-redux'
export default function AdminChatRoomComponent({chatRoom,roomIndex,socket,socketUser}) {
  // here we have to create the dynamic state variable and close function for each of the chat box
  
  // this is how we create the local state variable for the component
  // const [toast1,closeToast1] =useState(true);
    // const close1=()=>{
    //     closeToast1(false);
    // }
    

    // this is how we have created dynamically  local state variable for the component
    [window["toast" + roomIndex], window["closeToast" + roomIndex]] = useState(true);
    const [render,rerender]=useState(true);
    const close = (socketId) => {
        window["closeToast" + roomIndex](false);
        socket.emit('admin closes chat',socketId);
    }
    const dispatch=useDispatch();
 
    const adminSubmitChatMsg=(e,element)=>{
      e.preventDefault();
      if(e.keyCode && e.keyCode!==13)
      {
        // if key on the key board is not enter than return 
        return ;
      }
      const message=document.getElementById(element);
      let temp=message.value.trim();
      if(temp===""  || temp===null || temp===false  || !temp){
        return ;
      }
        chatRoom[1].push({admin:message.value});

        socket.emit('admin sends message',{
          user:socketUser,
          message:temp
        })

        rerender(!render);

        message.focus();
        dispatch(setMessageRecieved(false));
        setTimeout(() => {
            message.value = "";
            const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
            if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 50)
      }
      useEffect(()=>{
        const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
      })
  return (
     <Toast className='ms-5 mb-5' show={window["toast" + roomIndex]} onClose={()=>close(chatRoom[0])}>
        <Toast.Header >
           <b style={{width:'100%'}}> Chat with buyer</b>
        </Toast.Header>
        <Toast.Body>
            <div className={`cht-msg${socketUser}`} style={{maxHeight:'500px' ,overflow:"scroll"}}>

            {chatRoom[1].map((msg,idx)=>{
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
            <Form>
            <Form.Group
              className="mb-3"
              controlId={`adminChatMsg${roomIndex}`}
            >
              <Form.Label>Write a message</Form.Label>
              <Form.Control onKeyUp={(e) => adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)} as="textarea" rows={2} />
            </Form.Group>
            <Button onClick={(e) => adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)} variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Toast.Body>
     </Toast>
  )
}
