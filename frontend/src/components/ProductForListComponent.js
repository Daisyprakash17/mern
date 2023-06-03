import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const ProductForListComponent = ({images,name,description,price,rating,reviewsNumber,productId}) => { 
  return (
    <Card style={{  marginTop:"30px",marginBottom:"50px" ,padding:"10px" ,backgroundColor:"#f2f2f2" }}>
      <Row>
      <Col lg={5}>
      <Card.Img  crossOrigin="anonymous" style={{maxHeight:'350px',maxWidth:'600px'}} variant="top" src={images[0]?images[0].path:""} />
      </Col>
      <Col lg={7}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
           </Card.Text>
        <Card.Text>
          <Rating readonly size={20} initialValue={rating}/> ({reviewsNumber}) 
        </Card.Text>
        <Card.Text className="h4" >
        ₹{" "}{price} 
        </Card.Text>
        <Link to={`/product-details/${productId}`}>
        <Button variant="success"  >See product</Button>
        </Link>
      </Card.Body>
      </Col>
      </Row>
    </Card>
  );
};

export default ProductForListComponent;
