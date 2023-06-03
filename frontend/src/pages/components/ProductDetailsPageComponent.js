import { Row, Col, Container,Image, ListGroup, Form, Button,Alert,} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent"; 
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetailsPageComponent({addtocartReduxaction,reduxdispatch,getProductDetails,userinfo,writereviewapirequest}) {
      
       const {id}=useParams();
        const [quantity,setquantity]=useState(1);
        const [showCartMessage,setshowCartMessage]=useState(false);
        const [price,setprice]=useState(0);
        const [product,setproduct]=useState([]);
        const [loading,setloading]=useState(true);
        const [productreviewed,setproductreviewed]=useState(false);
        const [productalreadyreviewed,setproductalreadyreviewed]=useState(false);
        const [addtocartdisabled,setaddtocartdisabled]=useState(false);
      //  console.log(id);
    const addtocarthandler=()=>{ 
      // console.log('the quantity is ',Number(quantity))
      if(Number(quantity)>0){
        reduxdispatch(addtocartReduxaction(id,quantity))
          setshowCartMessage(true);
      }
    }
   useEffect(async()=>{ 
    if(userinfo.isAdmin===undefined || userinfo.isAdmin===true)
    {
      setaddtocartdisabled(true);
    }
    getProductDetails(id).then(data=>{ 
      setproduct(data); 
      setloading(false);
    }).catch(err=>{
      console.log('there is some error in getting the product detail');
    })
   },[id,productreviewed])
   const sendReviewHandler=(e)=>{ 
    e.preventDefault();
    const form =e.currentTarget.elements;
    const formInput={
      comment:form.comment.value,
      rating:form.rating.value,
    }
    if(e.currentTarget.checkValidity()===true){ 
      writereviewapirequest(id,formInput).then(data=>{
        if(data==='review added to the product')
        setproductreviewed(true);
        else if(data==="product already reviewed")
        {
          setproductalreadyreviewed(true);
          setproductreviewed(true);
        }
      }).catch(err=>{
        console.log('some error in writing the review form products ',err)
      })
    }

   }
  return (
    <Container>
      <AddedToCartMessageComponent showCartMessage={showCartMessage} setshowCartMessage={setshowCartMessage} />
      <Row className="mt-5">
        {
          loading ?(<h1>Product is loading Please Wait</h1>):(
            <>
          <Col md={4}>
            {product.images?product.images.map((image,id)=>{
            return <div key={id}>
                <div key={id} id={`image_id-${id+1}`}>
                <Image crossOrigin="anonymous" fluid src={image.path} />
                </div><br/> 
            </div>
            }) : null }
          </Col>
          <Col md={8}>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item><h1>{product.name} </h1></ListGroup.Item>
                  <ListGroup.Item>
                    <Rating readonly size={20} initialValue={product.rating} /> ({product.reviewsNumber})
                  </ListGroup.Item>
                  <ListGroup.Item>Price <span className="fw-bold">₹ {product.price}</span></ListGroup.Item>
                  <ListGroup.Item>{product.description}</ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={4}>
              <ListGroup>
                  <ListGroup.Item>Status:{product.count>0?' In stock':' Out of Stock'}</ListGroup.Item>
                  <ListGroup.Item>
                    Price: <span className="fw-bold">₹ {product.price}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Quantity: 
                    <Form.Select value={quantity} onChange={(e)=>setquantity(e.target.value)} size="lg" aria-label="Default select example">
                      <option value="0">Choose</option> 
                      { [...Array(product.count>=10?10:product.count)].map((x,idx)=>{
                         return   <option value={idx+1} key={idx}>{idx+1}</option>

                      })} 
                    </Form.Select>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button onClick={addtocarthandler} variant="danger" disabled={addtocartdisabled} >Add to cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              
            </Row>
            <Row>
              <Col className="mt-5">
                <h5>REVIEWS</h5>
                <ListGroup variant="flush">
                  {product.reviews.map((review,idx)=>(   
                    <ListGroup.Item key={idx} >
                      {review.user.name} <br/>
                      <Rating readonly size={20} initialValue={review.rating}></Rating> <br/>
                      
                        {review.createdAt.substring(0,10)} <br/>
                        {review.comment}
                    </ListGroup.Item>
                    
                  ))}
                </ListGroup>
              </Col>
            </Row>
  
            <hr />
            {!userinfo.name &&<Alert variant="danger">Login first to write a review</Alert> }
            
            <Form onSubmit={sendReviewHandler}>  
              <Form.Group  className="mb-3" controlId="exampleForm.ControlTextarea1"  >
                <Form.Label>Write a review</Form.Label>
                <Form.Control as="textarea" rows={3} name='comment' disabled={!userinfo.name || productreviewed} />
              </Form.Group>
              <Form.Select name='rating' disabled={!userinfo.name|| productreviewed} aria-label="Default select example">
                <option value="">Your Rating</option>
                <option value="5">5 (Very good)</option>
                <option value="4">4 (Good)</option>
                <option value="3">3 (Average)</option>
                <option value="2">2 (Bad)</option>
                <option value="1">1 (Useless)</option>
              </Form.Select>
              <Button variant="primary" style={{marginTop:"20px"}} disabled={!userinfo.name|| productreviewed} type="submit">Post review </Button>
                    <br></br>
                    {productalreadyreviewed?(<h5 style={{color:'red'}}>You already reviewed this product !!!</h5>):""}
            </Form>
          </Col>
            </>
            )
          
        }
      </Row>
    </Container>
  );
};
