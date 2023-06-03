import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import CartItemComponent from "../../../components/CartItemComponent"
import {useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeAllProducts } from '../../../redux/actions/cartActions'
export default function UserCartDetailsPageComponent({cartItems,cartSubTotal,itemsCount,reduxDispatch,addtocart,removeFromCart,getuser,userInfo,createOrder}) {
  const navigate=useNavigate();
  const [buttondisabled,setbuttondisabled]=useState(false);
  const [useraddress,setuseraddress]=useState({});
  const [missingaddress,setmissingaddress]=useState(false);
  const [paymentMethod,setpaymentMethod]=useState("pp");
  const [buttontext,setbuttontext]=useState("Pay for order")
  const dispatch=useDispatch();
    const changeCount=(productID,count)=>{
        reduxDispatch(addtocart(productID,count))
    }
    const removeCartItemHandler=(productID,quantity,price)=>{ 
        if(window.confirm("Do you want to remove the item from cart ??"))
        { 
            reduxDispatch(removeFromCart(productID,quantity,price));
        }
    }
    const choosePayment=(e)=>{
      setpaymentMethod(e.target.value);
      if(e.target.value==='pp')
      {
        setbuttontext('Pay for order');
      }
      else
      {
        setbuttontext('Place you order')
      }
    }
    const orderHandler=()=>{
      const  orderData={
        orderTotal:{
          itemsCount,
          cartSubtotal:cartSubTotal
        },
        cartItems:cartItems.map((item)=>{
          // console.log(item.image);
          return {
            productID:item.productID,
            name:item.name,
            price:item.price,
            image:{path:item.image?(item.image.path??null):null},
            quantity:item.quantity,
            count:item.count

          }
        }),
        paymentMethod:paymentMethod,
      }
      // console.log(orderData);
      createOrder(orderData)
      .then((data)=>{
        // no after as the order is place so cart items should be removed so 
        // remove the cart items from the cart redux
        dispatch(removeAllProducts())
        if(data)
        navigate('/user/order-details/'+data._id)
      })
    }

    useEffect(()=>{
      getuser().then((data)=>{  
        if(!data.address || !data.city || !data.state || !data.country || !data.phoneNumber || !data.zipCode)
        {
          setbuttondisabled(true);
          setmissingaddress(true)
        }
        else{
          setuseraddress({address:data.address,city:data.city,state:data.state,country:data.country,phoneNumber:data.phoneNumber,zipCode:data.zipCode})
          setmissingaddress(false);
        }
      }).catch((err)=>{
        console.log(err);
      })
    },[])
  return (
    <Container   fluid>
      <Row className='mt-4'>
          <h1>Cart Details</h1>
          <Col md={8} className='mt-4'>
            <Row>

            <Col md={6}><h3>Shipping address</h3>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br/>
              <b>Address</b> :{useraddress.address} {useraddress.city} {useraddress.state} {useraddress.country} {useraddress.zipCode}<br/>
              <b>Phone No</b> : {useraddress.phoneNumber}
            </Col>
            <Col md={6}><h3>Select Payment method</h3>
              <Form.Select onChange={choosePayment}  >
                  <option value="pp">Paypal</option>
                  <option value="cod">Cash on dilvery</option>
              </Form.Select>
            </Col>
            <Row>
                <Col className='mt-3'  >
              {missingaddress?(
                <Alert variant='danger'> Not delivered : In order to make order Complete all the details of your profile</Alert>
                ):""}
              </Col>
              {/* <Col className='mt-3'>
                <Alert variant='danger'>Choose a payment mode </Alert>
              </Col> */}
            </Row>
            </Row>
            <br/><hr/>
              <h2>Order items</h2>
              <ListGroup>
                {cartItems.map((item,idx)=>{
                  return <ListGroup.Item key={idx}> 
                    <CartItemComponent item={item} changeCount={changeCount} removeCartItemHandler={removeCartItemHandler} />
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
                    Order total :<b>₹{cartSubTotal}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Shipping :<b>Included</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Tax :<b>Included</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     Total price :<b className='text-danger'>₹{cartSubTotal}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Button disabled={buttondisabled} variant='danger' style={{width:"100%"}} onClick={()=>orderHandler()}>{buttontext}</Button>
                  </ListGroup.Item>
                </ListGroup>
            </Col>
      </Row>
    </Container>
  )
}
