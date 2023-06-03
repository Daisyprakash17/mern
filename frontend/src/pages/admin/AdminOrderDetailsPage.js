import React, { useEffect } from 'react'
import OrderDetailsPageComponent from './components/OrderDetailsPageComponent'
import axios from 'axios'

const getOrder=async(id)=>{
    const {data}=await axios.get(`/api/orders/user/${id}`)
    return data;
}
const markasPaid=async(id)=>{ 
  const {data}=await axios.put("/api/orders/paid/"+id);
  return data;
}
const markasDelivered=async(id)=>{
  const {data}=await axios.put('/api/orders/delivered/'+id); 
  if(data)
  return data;
}
export default function AdminOrderDetailsPage() {
 
  return  <OrderDetailsPageComponent getOrder={getOrder} markasDelivered={markasDelivered} markasPaid={markasPaid}/>
}
