
import React from 'react'
import UserCartDetailsPageComponent from './components/UserCartDetailsPageComponent'
import {useSelector,useDispatch} from 'react-redux'
import { addtocart,removeFromCart } from '../../redux/actions/cartActions'
import axios from 'axios';
export default function UserCartDetailsPage() {
  const reduxDispatch=useDispatch();
  const {cartItems,cartSubTotal,itemsCount}=useSelector((state)=>state.cart)
  const {userinfo}=useSelector((state)=>state.userRegisterLogin);

  const getuser=async()=>{
    const {data}=await axios.get('/api/users/profile/'+userinfo._id);
    return data;
  }
  
  const createOrder=async(orderData)=>{
    const {data}=await axios.post('/api/orders',{...orderData})
    return data
  }


  return <UserCartDetailsPageComponent
   cartItems={cartItems}
   cartSubTotal={cartSubTotal}
   itemsCount={itemsCount}
   reduxDispatch={reduxDispatch}
   addtocart={addtocart}
   removeFromCart={removeFromCart}
   userInfo={userinfo}
   getuser={getuser}
  createOrder={createOrder}
   />
}

