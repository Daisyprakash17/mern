
import React from 'react'
import RegisterPageComponent from './components/RegisterPageComponent'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setReduxUserState } from '../redux/actions/userActions'
const registerUserApiRequest=async(name,lastName,email,password)=>{ 
  const {data}=await axios.post('/api/users/register',{name,lastName,email,password})
  return data;
}
export default function RegisterPage() {
  const reduxdispatch=useDispatch();
  return <RegisterPageComponent registerUserApiRequest={registerUserApiRequest} reduxdispatch={reduxdispatch} setReduxUserState={setReduxUserState}/>
}


