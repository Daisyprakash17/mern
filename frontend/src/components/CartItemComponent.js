import React from 'react'
import { Col, Container, Form, Image, Row ,Button } from 'react-bootstrap'

export default function CartItemComponent({item,orderCreated=false,changeCount=false,removeCartItemHandler=false}) { 
    return (
    <Container>
    <Row>
        <Col md={2}>
            <Image crossOrigin='anonymous'src={item.image ? item.image.path ?? null : null} fluid></Image>
        </Col>
        <Col md={2}>
            {item.name}
        </Col>
        <Col md={2}>
        ₹{item.price}
        </Col>
        <Col md={3}>
        <Form.Select disabled={orderCreated} value={item.quantity} onChange={(changeCount?(e)=>changeCount(item.productID,e.target.value):undefined)}>
              {[...Array(item.count).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Select>
        </Col>
        <Col md={3}>
        <Button disabled={orderCreated} type="button"variant="secondary" onClick={() => removeCartItemHandler(item.productID,item.quantity,item.price)}>
              <i className="bi bi-trash"></i>
        </Button>
        </Col>
    </Row>
    </Container>
  )
}
