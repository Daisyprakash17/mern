 
import React from 'react'
import UsersPageComponent from './components/UsersPageComponent'

import axios from "axios"

const fetchusers=async(abctrl)=>{ 
      const {data}=await axios.get("/api/users", { signal: abctrl.signal,  });
      return data
}  
const deleteuser=async(userid)=>{
  const {data}=await axios.delete(`/api/users/${userid}`);
  return data;
}
export default function AdminUsersPage() {
  return  <UsersPageComponent fetchusers={fetchusers} deleteuser={deleteuser}/>
}


