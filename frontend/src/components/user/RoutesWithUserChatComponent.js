import React from 'react'
import { Outlet } from 'react-router-dom'
import UserChatComponent from './UserChatComponent'
export default function () {
  return (
    <>
    <Outlet/>   
    <UserChatComponent/>
    </>
  )
}
