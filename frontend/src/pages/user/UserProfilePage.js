

import React from 'react'
import UserProfilePageComponent from './components/UserProfilePageComponent'
import axios from 'axios'
import {useSelector, useDispatch} from "react-redux"
 import { setReduxUserState } from '../../redux/actions/userActions'



const updateUserApiRequest=async(name,lastName,phoneNumber,address,country,zipCode,city,state,password)=>{
  const {data}=await axios.put('/api/users/profile',{name,lastName,phoneNumber,address,country,zipCode,city,state,password});
  console.log('update detila is '); 
  return data;
}
const fetchUser=async(userId)=>{
  const {data}=await axios.get('/api/users/profile/'+userId)
  console.log(data);
  return data;
}
export default function UserProfilePage() {
  const reduxdispatch=useDispatch();
  const {userinfo}=useSelector((state)=>{return state.userRegisterLogin});
  return  <UserProfilePageComponent
   updateUserApiRequest={updateUserApiRequest}
   fetchUser={fetchUser}
    userinfofromredux={userinfo} 
    reduxdispatch={reduxdispatch} 
   setReduxUserState={setReduxUserState}
   />
}
