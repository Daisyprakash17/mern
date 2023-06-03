import React, { useState } from 'react'; 
import {   Button , Alert} from 'react-bootstrap';
import { Link , NavLink, useNavigate } from 'react-router-dom';
 

export default function AddedToCartMessageComponent({showCartMessage,setshowCartMessage}) {
    const navigate=useNavigate();
    const goback=()=>{
        navigate(-1);
    }
  return (
    <Alert show={showCartMessage} variant="success" onClose={() => setshowCartMessage(false)} dismissible>
      <Alert.Heading>The product has been sucessfully added to the Cart</Alert.Heading>
    
       <Button variant='light' style={{marginRight:"10px"}} onClick={goback} >Go back</Button> 
       <Link to ="/cart" > 
       <Button variant='info'>Go to Cart</Button>
       </Link>
    </Alert>
  )
}
