import React from 'react'
import ProductsPageComponent from './components/ProductsPageComponent'

import axios  from 'axios'
const fetchProducts=async(abctrl)=>{
  const {data}=await axios.get('/api/products/admin',{signal:abctrl.signal});
  return data;
}
const deleteProduct=async(productid)=>{
  const {data}=await axios.delete(`/api/products/admin/${productid}`);
  return data;
}
export default function AdminProductsPage() {
  return  <ProductsPageComponent fetchProducts={fetchProducts} deleteProduct={deleteProduct}/>
}
