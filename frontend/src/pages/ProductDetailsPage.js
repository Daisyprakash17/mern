import React from 'react'
import ProductDetailsPageComponent from './components/ProductDetailsPageComponent'
import {useDispatch ,useSelector} from 'react-redux'
import {addtocart} from '../redux/actions/cartActions'
import axios from 'axios'

const getProductDetails=async(id)=>{
  const data=await axios.get(`/api/products/get-one/${id}`);
  return data.data;
}
const writereviewapirequest=async(id,forminput)=>{
  console.log('the product id is ', id);
  console.log('the review of the product is ',forminput);
  const data=await axios.post(`/api/users/review/${id}`,{...forminput}); 
  return data.data;

}
export default function ProductDetailsPage() {
  const dispatch=useDispatch();  
  const userinfo=useSelector((state)=>state.userRegisterLogin.userinfo);
  return  <ProductDetailsPageComponent addtocartReduxaction={addtocart} reduxdispatch={dispatch}
      getProductDetails={getProductDetails}
      userinfo={userinfo}
      writereviewapirequest={writereviewapirequest}
    />
}
