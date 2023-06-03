import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import PaginationComponent from "../../components/PaginationComponent";
import ProductForListComponent from "../../components/ProductForListComponent";

import SortOptionsComponent from "../../components/SortOptionsComponent";
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";

import AttributesFilterComponent from "../../components/filterQueryResultOptions/AttributesFilterComponent";
import { Button, ListGroup } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
 
export default function ProductListPageComponent({getProducts,categories}){ 
    window.scrollTo(0,0)
    const [products,setproducts]=useState([]);
    const [loading,setloading]=useState(true);
    const [error,seterror]=useState(false);
    const [attrsfilter,setattrsfilter]=useState([]); // collect category attributes from db and show on web page
    const [attrsfromfilter,setattrsfromfilter]=useState([]); //for holding attrs filter of the category
    const [showfilterresetbutton,setshowfilterresetbutton]=useState(false); 
    const [filters,setfilters]=useState({}); 
    const [price,setprice]=useState(250); // store the filter price
    const [rating,setrating]=useState({});
    const [categoriesfromfilter,setcategoriesfromfilter]=useState({});
    const [sortOption,setsortoption]=useState("");
    const [paginationlinksnumber,setpaginationlinksnumber]=useState(null);
    const [pagenumber,setpagenumber]=useState(null);
    const {categoryName}=useParams() || ""
    const { pageNumParam } = useParams() || 1;
    const { searchQuery } = useParams() || "";
    const location=useLocation();
    const navigate=useNavigate();
    useEffect(()=>{
      if(categoryName && categories)
      {
          // getting the data of the specific category only from all categories
        let categorydata=categories.find((item)=>
          item.name===categoryName.replace(/,/g,"/")
          ) 
          if(categorydata)
            {
              let mainCategory=categorydata.name.split("/")[0];  
                let index=categories.findIndex((item)=>item.name===mainCategory)
                setattrsfilter(categories[index].attrs); 
            }
      }
      else{
        setattrsfilter([]);
      }
    },[categoryName,categories])

    useEffect(()=>{
      if (Object.entries(categoriesfromfilter).length > 0) {
        setattrsfilter([]);
        var cat = [];
        var count;
        Object.entries(categoriesfromfilter).forEach(([category, checked]) => {
            if (checked) {
                var name = category.split("/")[0];
                cat.push(name);
                count = cat.filter((x) => x === name).length;
                if (count === 1) {
                  var index = categories.findIndex((item) => item.name === name);  
                  setattrsfilter((attrs) => [...attrs, ...categories[index].attrs]);
                }
            }
        })
    }
    },[categoriesfromfilter,categories])
 
    useEffect(()=>{
        getProducts(categoryName,pageNumParam,searchQuery, filters,sortOption).then((data)=>{
          setproducts(data.products);
          setpaginationlinksnumber(data.paginationLinksNumber);
          setpagenumber(data.pageNum);
          setloading(false);
        })
        .catch((err)=>{
          console.log(err)
          seterror(true);
        }); 
    },[categoryName,pageNumParam,searchQuery, filters,sortOption])
      // console.log(filters)
      // console.log('the sort options that is selected is ',sortOption);

    const filterHandler=()=>{
      navigate(location.pathname.replace(/\/[0-9]+$/, "")); 
      setshowfilterresetbutton(true);
      setfilters({
        price:price,
        rating:rating,
        category:categoriesfromfilter,
        attrs:attrsfromfilter,
      })  
    }


    const filterreset=()=>{
      setshowfilterresetbutton(false);
      setfilters({});
      // window.location.href=`/product-list/category/${categoryName}`
      window.location.href='/product-list'
    }
    return (
      <>
        <Container fluid style={{backgroundColor:"#ffffcc" }}>
          <Row>
            <Col md={3} style={{marginTop:"20px"}}>
              <ListGroup.Item >
                <SortOptionsComponent setsortoption={setsortoption } />
  
                <div>FILTERS: </div>
                <PriceFilterComponent price={price} setprice={setprice} />
                <RatingFilterComponent   setrating={setrating}/>
                {!location.pathname.match(/\/category/) && (
                  <CategoryFilterComponent setcategoriesfromfilter={setcategoriesfromfilter}/>
                )}
              </ListGroup.Item>
  
              <ListGroup.Item>
                <AttributesFilterComponent attrsfilter={attrsfilter} setattrsfromfilter={setattrsfromfilter} />
              </ListGroup.Item>
  
              <ListGroup.Item>
                <Button variant="primary" style={{marginRight:"10px"}} onClick={filterHandler}>Filter</Button>
                {showfilterresetbutton && (
                  <Button variant="danger" onClick={filterreset}>Reset Filters</Button>
                )}
              </ListGroup.Item>
  
            </Col>
            <Col md={9}>
              {loading ? (<h1>Loading Products....</h1>): error ?(<h1>Error while loading the Products ... </h1>):(

                products.map((product)=>{
                  return <ProductForListComponent
                  key={product._id} 
                  images={product.images} 
                  name={product.name} 
                  description={product.description} 
                  price={product.price}
                  rating={product.rating}
                  reviewsNumber={product.reviewsNumber}
                  productId={product._id}
                  />
                })
                )}
                {paginationlinksnumber>1? (
                  <PaginationComponent categoryName={categoryName} searchQuery={searchQuery}
                    paginationlinksnumber={paginationlinksnumber} pagenumber={pagenumber}
                  />
                ):null}
            </Col>
          </Row>
        </Container>
      </>
    );
  }