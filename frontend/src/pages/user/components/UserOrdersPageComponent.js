import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function UserOrdersPageComponent({getorders}) {
    const [userOrders,setuserOrders]=useState([]);
    useEffect(()=>{
        getorders().then((data)=>{
            setuserOrders(data);
            console.log(data[0]);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <Row className='m-5'>
      <Col md={12}>
        <h1>My orders</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Date</th>
          <th>Total</th>
          <th>Delivery Status</th>
           <th>Order details</th>
        </tr>
      </thead>
      <tbody>
        {userOrders.map((order,idx)=>{
          return   <Fragment key={idx}>
                <tr >
                  <td>{idx+1}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>₹{order.orderTotal.cartSubtotal}</td>
                  <td>{order.isDelivered?<i className="bi bi-check-lg text-success" ></i>:<i className="bi bi-x-lg text-danger" ></i>}</td> 
                   <td> <Link to={`/user/order-details/${order._id}`}>go to order</Link></td>
                </tr>  
                  </Fragment>
        })}
      </tbody>
    </Table>
      </Col>
    </Row>
  )
}
