 
 import React from 'react'
import OrdersPageComponent from './components/OrdersPageComponent'
 import axios from 'axios'


 const fetchOrders=async(abctrl)=>{
  const {data}=await axios.get("/api/orders/admin",{signal:abctrl.signal});  
  return data;
 }
 export default function AdminOrdersPage() {
   return <OrdersPageComponent fetchOrders={fetchOrders} />
 }
 