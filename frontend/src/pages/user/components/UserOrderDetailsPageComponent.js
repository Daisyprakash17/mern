import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import CartItemComponent from "../../../components/CartItemComponent"
import {useParams } from 'react-router-dom'

export default function UserOrderDetailsPageComponent({userinfo,getuser,getorder,loadScript,loadpaypalscripthandler}) {
    const [useraddress,setuseraddress]=useState({});
    const [paymentMethod,setpaymentMethod]=useState("");
    const [ispaid,setispaid]=useState(false);
    const [orderbuttonmessage,setorderbuttonmessage]=useState("");
    const [cartItems,setcartItems]=useState([]);
    const [cartSubTotal,setcartSubTotal]=useState(0);
    const [isdelivered,setisdelivered]=useState(false);
    const [buttonDisabled,setbuttonDisabled]=useState(false);
    const {id}=useParams();
    const paypalContainer=useRef();
    // console.log(paypalContainer)
    useEffect(()=>{
        getuser()
        .then((data)=>{
            setuseraddress({address:data.address,city:data.city,state:data.state,country:data.country,phoneNumber:data.phoneNumber,zipCode:data.zipCode})
           
        })
        .catch((err)=>console.log(err))

        getorder(id)
        .then((data)=>{ 
            setpaymentMethod(data.paymentMethod);
            setcartItems(data.cartItems);
            setcartSubTotal(data.orderTotal.cartSubtotal);
            data.isDelivered?setisdelivered(data.deliveredAt):setisdelivered(false);
            data.isPaid?setispaid(data.paidAt):setispaid(false);
            if(data.isPaid)
            {
                setorderbuttonmessage("Your Order is finished");
                setbuttonDisabled(true);
            }
            else
            {
                if(data.paymentMethod==='pp')
                {
                    setorderbuttonmessage('Pay for your order');
                }
                else
                {
                    setbuttonDisabled(true);
                    setorderbuttonmessage("Your Order is Placed")
                }
            }
        })
        .catch((err)=>console.log(err));
    },[])
    
    const paymentHandler=()=>{
        setbuttonDisabled(true);
        if(paymentMethod==='pp')
        {
            setorderbuttonmessage('To pay for order Choose one of the Options');
            if(!ispaid)
            {
                // load paypal script
              loadpaypalscripthandler(cartSubTotal,cartItems,id,updatestateafterOrder);
            }
        }
        else
        {
            setorderbuttonmessage('Your order was placed Thank you');
        }
    }
    const updatestateafterOrder=(paidAt)=>{
        setorderbuttonmessage('Thank you for your payment');
        setispaid(paidAt);
        setbuttonDisabled(true);
        paypalContainer.current.style='display:none';
    }
    return (
    <Container   fluid>
      <Row className='mt-4'>
          <h1>Order Details</h1>
          <Col md={8} className='mt-4'>
            <Row>

            <Col md={6}><h3>Shipping address</h3>
              <b>Name</b>:{userinfo.name} {userinfo.lastName}<br/>
              <b>Address</b> :{useraddress.address} {useraddress.city} {useraddress.state} {useraddress.country} {useraddress.zipCode}<br/>
              <b>Phone No</b> : {useraddress.phoneNumber}
            </Col>
            <Col md={6}><h3>Payment method</h3>
              <Form.Select disabled={true} value={paymentMethod}>
                  <option value="pp">Paypal</option>
                  <option value="cod">Cash on dilevery</option>
              </Form.Select>
            </Col>
            <Row>
              <Col className='mt-3'>
                <Alert variant={isdelivered?'success':'danger'} > {isdelivered?(<>Delivered at {isdelivered}</>):"Not Delivered"}</Alert>
              </Col>
              <Col className='mt-3'>
                <Alert variant={ispaid?'success':'danger'}> {ispaid?(<>Paid on {ispaid}</>):"Not paid yet"}</Alert>
              </Col>
            </Row>
            </Row>
            <br/><hr/>
              <h2>Order items</h2>
              <ListGroup>
                {cartItems.map((item,idx)=>{
                  return <ListGroup.Item key={idx}> 
                    <CartItemComponent item={item} orderCreated={true} />
                  </ListGroup.Item>
                  
                })}
              </ListGroup>
          </Col>
          <Col md={4} className='mt-4'>
                <ListGroup>
                  <ListGroup.Item>
                    <h3>Order summary</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Order total :<b>₹ {cartSubTotal}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Shipping :<b>Included</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Tax :<b>Included</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Total price :<b className='text-danger'>₹ {cartSubTotal}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Button variant='danger' style={{width:"100%",marginBottom:"20px"}} disabled={buttonDisabled} onClick={paymentHandler}>{orderbuttonmessage}</Button>
                        <div  style={{position:'relative',zIndex:1}}>
                    <div ref={paypalContainer} id='paypal-container-element'></div>
                        </div>

                  </ListGroup.Item>
                </ListGroup>
            </Col>
      </Row>
    </Container>
  )
}
