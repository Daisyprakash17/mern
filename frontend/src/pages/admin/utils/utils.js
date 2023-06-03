import axios from 'axios'
export const uploadImagesApiRequest=async(images,productId)=>{
    console.log('upload imges is caled ');
    const formdata=new FormData();
    Array.from(images).forEach(image=>{
      formdata.append('images',image);
  
    })
   const {data}= await axios.post('/api/products/admin/upload/?productId='+productId,formdata);
    return data;
}
  export const uploadimagesCloudinaryAPirequest=async(images,productId)=>{
    console.log('this is called ');
    const url="https://api.cloudinary.com/v1_1/dvetmdv90/image/upload";
    const formdata=new FormData();
    for(let i=0;i<images.length;i++)
    {
  
      let file=images[i];
        // console.log(file)
      formdata.append('file',file);
      formdata.append("upload_preset","ffqjrmnq")
      fetch(url,{
        method:"POST",
        body:formdata,
      }).then((response)=>{
          return response.json();
      }).then((data)=>{
        axios.post('/api/products/admin/upload?cloudinary=true&productId='+productId,data);
      })
    }
  }