import React from 'react'
import { Col, Row } from 'react-bootstrap'
import AdminChatRoomComponent from '../../components/admin/AdminChatRoomComponent'
import AdminLinksComponent from '../../components/admin/AdminLinksComponent'
import { useSelector  } from 'react-redux'
export default function AdminChatsPage() {
  const {chatRooms ,socket }=useSelector((state)=>state.adminChat);
  return (
    <Row className='m-5'>
      <Col md={2}>
      <h1>Admin Links</h1>
        <AdminLinksComponent/>
      </Col>
      <Col md={10}>
        
      <h1>Chats With Buyers </h1>
      {Object.entries(chatRooms).map((chatRoom,index)=>{

        return  <AdminChatRoomComponent key={index} chatRoom={chatRoom} roomIndex={index+1} socket={socket} socketUser={chatRoom[0]} />
      })}
      </Col>
    </Row>
  )
}
