import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function FooterComponents() {
  return (
    <footer>

     <Container fluid className="bg-dark text-white text-center py-5">
      <Row className='mt-2'>
        <Col> Copyright &copy; EazyMart </Col>
      </Row>
     </Container>
    </footer>
  )
}
