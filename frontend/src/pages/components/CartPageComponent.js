import React from 'react'
import { Alert, Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap"
import { Link } from 'react-router-dom'
import CartItemComponent from '../../components/CartItemComponent'

export default function CartPageComponent({cartItems,cartSubTotal,reduxdispatch,addtocart,removeFromCart})  {
    const changeCount=(productID,count)=>{
        reduxdispatch(addtocart(productID,count));
    }
    const removeCartItemHandler=(productID,quantity,price)=>{
        if(window.confirm('Do you want to remove the Item from cart ?? '))
        { 
            reduxdispatch(removeFromCart(productID,quantity,price))
        }
    }
    return (
      <Container className='mt-5'>
  
          <Row>
            <Col md={8}>
              <h1>SHOPPING CART</h1>
                {cartItems.length==0?
                (
                    <Alert variant='info'>Your Cart is Empty</Alert>

                ):( 
                    <ListGroup variant='flush' >
                    {cartItems.map((item,idx)=>{
                        return <ListGroup.Item key={idx}><CartItemComponent    item={item} changeCount={changeCount} removeCartItemHandler={removeCartItemHandler}/><br/></ListGroup.Item>;
                    })}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
             <ListGroup  >
              <ListGroup.Item>
                <h2>Subtotal {'to do'}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                 Price   <span className='fw-bold'>₹{cartSubTotal}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <LinkContainer to="/user/cart-details">
                  <Button type='button' disabled={cartItems.length===0}> Proceed to Checkout</Button>
                </LinkContainer>
              </ListGroup.Item>
             </ListGroup>
            </Col>
          </Row>
      </Container>
      )
  }
