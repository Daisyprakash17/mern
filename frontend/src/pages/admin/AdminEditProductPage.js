import React from 'react'
import EditProductPageComponent from './components/EditProductPageComponent'
import { useSelector ,useDispatch} from 'react-redux'
import axios from 'axios'
import { saveattributetoCatDoc } from '../../redux/actions/categoryActions'
import { uploadImagesApiRequest,uploadimagesCloudinaryAPirequest } from './utils/utils'
const fetchProduct=async(productId)=>{
  const {data}=await axios.get(`/api/products/get-one/${productId}`);
  return data;
}
const updateproductApiRequest=async(productId,inputvalues)=>{
  const {data}=await axios.put(`/api/products/admin/${productId}`,{...inputvalues})
  console.log(data); 
  return data;
}

 
export default function AdminEditProductPage() {

 
  const {categories}=useSelector((state)=>state.getCategories); 
  const reduxDispatch=useDispatch();
  const imageDeleteHandler=async(imagePath,productId)=>{ 
    let encoded=encodeURIComponent(imagePath);  
    if(process.env.NODE_ENV!=='production')
    {
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`)
    }
    else{
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}?cloudinary=true`)
    }
  }
  return <EditProductPageComponent
    categories={categories}
    fetchProduct={fetchProduct}
    updateproductApiRequest={updateproductApiRequest}
    reduxDispatch={reduxDispatch}
    saveattributetoCatDoc={saveattributetoCatDoc}
    imageDeleteHandler={imageDeleteHandler} 
    uploadImagesApiRequest={uploadImagesApiRequest}
    uploadimagesCloudinaryAPirequest={uploadimagesCloudinaryAPirequest}
   /> 
}
