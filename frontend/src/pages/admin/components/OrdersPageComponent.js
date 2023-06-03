import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AdminLinksComponent from '../../../components/admin/AdminLinksComponent'
import { logout } from "../../../redux/actions/userActions";
 import { useDispatch } from "react-redux";
export default function OrdersPageComponent({fetchOrders}) {
      const dispatch=useDispatch();
      const [orders,setOrders]=useState([]);
    
    useEffect(()=>{ 
        const abctrl=new AbortController();
        fetchOrders(abctrl).then((res)=>{setOrders(res)})
        .catch((err)=>{
          dispatch(logout())
          
    // console.log(err.response.data.message?err.response.data.message:err.response.data)
        });  
        return ()=>{abctrl.abort()}
    },[])


    return (
      <Row className='m-5'>
        <Col md={2}> 
        <h1>Admin Links</h1>
            <AdminLinksComponent/>
        </Col>
        <Col md={10}>
          
        <h1>Orders</h1>
        <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Delivery Status</th>
            <th>Payment method</th>
            <th>Order details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order,idx)=>{
            return   <Fragment key={idx}>
                  <tr >
                    <td>{idx+1}</td>
                    <td>{order.user?(<>{order.user.name}{order.user.lastName}</>):"null"}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>₹{order.orderTotal.cartSubtotal}</td>
                    <td>{order.isDelivered?<i className="bi bi-check-lg text-success" ></i>:<i className="bi bi-x-lg text-danger" ></i>}</td> 
                    <td>{order.paymentMethod}</td>
                    <td> <Link to={`/admin/order-details/${order._id}`}>go to order</Link></td>
                  </tr>  
                    </Fragment>
          })}
        </tbody>
      </Table>
        </Col>
      </Row>
    )
  }
  
