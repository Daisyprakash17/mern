import React from 'react'
import { Card  , Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

export default function CategoryCardComponent({category ,idx}) {
     
  return (
    <Card style={{ width: '40rem',margin:"0 auto" }} className="text-center">
      <Card.Img  crossOrigin="anonymous"  variant="top" src={category.image ?? null} />
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text>
          {category.description}
        </Card.Text>
        <LinkContainer to={`/product-list/category/${category.name}`}>
        <Button variant="primary">Go to Catogory</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  )
}
