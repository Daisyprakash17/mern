import React from 'react'
import CreateProductPageComponent from './components/CreateProductPageComponent'
import axios from 'axios'
import { uploadImagesApiRequest,uploadimagesCloudinaryAPirequest } from './utils/utils'
import {useSelector ,useDispatch} from 'react-redux'
import { newCategory ,deleteCategory,saveattributetoCatDoc} from '../../redux/actions/categoryActions'
const createProductApiRequest=async(formInputs)=>{
  const {data}=await axios.post('/api/products/admin',{...formInputs});
  return data;
}
 
export default function AdminCreateProductPage() {

  const {categories}=useSelector((state)=>state.getCategories) 
  const reduxdispatch=useDispatch();
  return <CreateProductPageComponent 
  createProductApiRequest={createProductApiRequest}
  uploadImagesApiRequest={uploadImagesApiRequest}
  uploadimagesCloudinaryAPirequest={uploadimagesCloudinaryAPirequest}
  categories={categories}
  reduxdispatch={reduxdispatch}
  newCategory={newCategory}
  deleteCategory={deleteCategory}
  saveattributetoCatDoc={saveattributetoCatDoc}
  />
} 