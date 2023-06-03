import React from 'react'
import UserOrdersPageComponent from './components/UserOrdersPageComponent'
import axios from 'axios'

const getorders=async()=>{
  const {data}=await axios('/api/orders');
  return data;
}
export default function UserOrdersPage() {
  return <UserOrdersPageComponent
    getorders={getorders}
  />
}
