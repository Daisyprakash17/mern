
import React from 'react'
import LoginPageComponent from './components/LoginPageComponent'

import {useDispatch} from 'react-redux'
import axios from 'axios' 
import { setReduxUserState } from '../redux/actions/userActions'
const loginUserApiRequest=async(email,password,doNotLogout)=>{
  const {data}=await axios.post('/api/users/login',{email,password,doNotLogout});  
  if(data && data.userloggedIn.doNotLogout)
  localStorage.setItem('userinfo',JSON.stringify(data.userloggedIn));
  else
  sessionStorage.setItem('userinfo',JSON.stringify(data.userloggedIn));
  return data;
}
export default function LoginPage() {
  const reduxdispatch=useDispatch();

  return  <LoginPageComponent loginUserApiRequest={loginUserApiRequest} reduxdispatch={reduxdispatch}
      setReduxUserState={setReduxUserState}/>
}
 