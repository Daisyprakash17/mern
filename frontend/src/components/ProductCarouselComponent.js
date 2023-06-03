import React from 'react'
import { Carousel } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
export default function ProductCarouselComponent() {
  return (
    <>
        <Carousel >
      <Carousel.Item interval={1000}  >
        <img
            crossOrigin='anonymous'
          className="d-block w-100"
          style={{height:"400px",objectFit:"cover"}}
          src="/images/carousel/carousel-1.png" 
          alt="First slide"
        />
        <Carousel.Caption>
            <LinkContainer style={{cursor:'pointer'}} to="/product-details">
          <h3>BestSeller in laptops </h3> 
            </LinkContainer>
          <p>Dell vostro 5568 best selling </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          style={{height:"400px",objectFit:"cover"}}
          className="d-block w-100"
          src="/images/carousel/carousel-2.png"
          alt="Second slide"
        />
        <Carousel.Caption>
        <LinkContainer style={{cursor:'pointer'}} to="/product-details">
          <h3>BestSeller in Books </h3> 
            </LinkContainer>
          <p>Rich Dad Poor Dat</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{height:"400px",objectFit:"cover"}}
          className="d-block w-100"
          src="/images/carousel/carousel-3.png"
          alt="Third slide"
        />
        <Carousel.Caption>
        <LinkContainer style={{cursor:'pointer'}} to="/product-details">
          <h3>BestSeller in Cameras </h3> 
            </LinkContainer>
          <p>Dell vostro 5568 best selling </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  )
}
