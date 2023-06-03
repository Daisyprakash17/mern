  
import EditUserPageComponent from './components/EditUserPageComponent'
import axios from 'axios'
const fetchuser=async(userId)=>{
  const data=await axios.get(`/api/users/${userId}`);
  return data.data
}
const updateUperApiRequest=async(userId,name ,lastName,email,isAdmin)=>{
  console.log(name,lastName,email,isAdmin);
  const data=await axios.put(`/api/users/${userId}`,{name,lastName,email,isAdmin});
  return data.data;
}

const AdminEditUserPage = () => { 
  return <EditUserPageComponent updateUperApiRequest={updateUperApiRequest} fetchuser={fetchuser} />
};

export default AdminEditUserPage;

