import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AdminLinksComponent from '../../../components/admin/AdminLinksComponent'
import { logout } from "../../../redux/actions/userActions";
 import { useDispatch } from "react-redux";
export default function ProductsPageComponent({fetchProducts,deleteProduct}) {

    const [products,setProducts]=useState([]);
    const [productdeleted,setProductsdeleted]=useState(false);
      const dispatch=useDispatch();
         
    const deleteHandler=async(productid)=>{
          if(window.confirm('Are you sure want to delete'))
          {
            const data=await deleteProduct(productid);
                if(data==="product deleted")
                setProductsdeleted(!productdeleted);
          }
        } 
        
        useEffect(()=>{
            const abctrl=new AbortController();
        
            fetchProducts(abctrl).then((res)=>{setProducts(res)})
            .catch((err)=>{
                console.log('ther is some error');
            dispatch(logout())
             
              // console.log(err.response.data.message?err.response.data.message:err.response.data)
            });
            
            return ()=>{abctrl.abort()};
        
        },[productdeleted])

      return (
        <Row className='m-5'>
          <Col md={2}> 
          <h1>Admin Links</h1>
              <AdminLinksComponent/>
          </Col>
          <Col md={10}>
            
          <h1>Product list <Link to="/admin/create-new-product"> <Button>Create new +</Button></Link></h1>
          <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Edit/Delete</th> 
            </tr>
          </thead>
          <tbody>
            {products.map((item,idx)=>{
              return   <Fragment key={idx}>
                    <tr >
                      <td>{idx+1}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>
                        <Link to ={`/admin/edit-product/${item._id}`}>
                        <Button>
                        <i className="bi bi-pencil-square "></i>
                        </Button>
                        </Link>
                         {" / "}
                        <Button style={{backgroundColor:'red'}} onClick={()=>deleteHandler(item._id)}>
                        <i className="bi bi-x-circle"></i>
                        </Button>
                        </td>  
                    </tr>  
                      </Fragment>
            })}
          </tbody>
        </Table>
          </Col>
        </Row>
      )
    }
    
