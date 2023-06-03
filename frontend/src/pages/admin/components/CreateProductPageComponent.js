import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert,
  } from "react-bootstrap";
  import { Link } from "react-router-dom";
  import { Fragment, useEffect, useState ,useRef} from "react";
  import { useNavigate } from "react-router-dom";
  import { categoryChange ,onattschangeHandler,attributvalueChanged} from "./utils/utils";
  const CreateProductPageComponent = ({ createProductApiRequest, uploadImagesApiRequest ,uploadimagesCloudinaryAPirequest,categories,reduxdispatch,newCategory ,deleteCategory ,saveattributetoCatDoc}) => {
    const [validated, setValidated] = useState(false);
    const [attributesTable, setattributesTable] = useState([]);
    const [images, setImages] = useState(false);
    const [isCreating, setIsCreating] = useState("");
    const [createProductResponseState, setCreateProductResponseState] = useState({ message: "", error: "" });
    const [categoryChoosen,setcategoryChoosen]=useState("Choose category");
    const [attributesFromDb,setattributesFromDb]=useState([])
    const attvalue=useRef(null);
    const attkey=useRef(null);
    const createnewattkey=useRef(null);
    const createnewattvalue=useRef(null);
    const [newattkey,setnewattkey]=useState(false);
    const [newattvalue,setnewattvalue]=useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget.elements;
      const formInputs = {
          name: form.name.value,
          description: form.description.value,
          count: form.count.value,
          price: form.price.value,
          category: form.category.value,
          attributesTable: attributesTable
      }
      if (event.currentTarget.checkValidity() === true) {
        if(images.length>3)
        {
          setIsCreating("TOO many files");
          return ;
        }
          createProductApiRequest(formInputs)
          .then(data => {
              if (images) {
                if(process.env.NODE_ENV!=='production')
                {

                  uploadImagesApiRequest(images, data.product_id)
                  .then(res => {})
                  .catch((er) => setIsCreating(er.response.data.message ? er.response.data.message : er.response.data))
                }else
                  {
                    uploadimagesCloudinaryAPirequest(images,data.product_id);
                  }

              }
              if(data.message==='new product has been created')
                navigate('/admin/products')
          }) 
          .catch(er => {
              setCreateProductResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data });
          })
      }
  
      setValidated(true);
    };
  
      const uploadHandler = (images) => {
          setImages(images);
      }
      const newCategoryHandler=(e)=>{
        if(e.keyCode && e.keyCode===13 && e.target.value)
        {
          reduxdispatch(newCategory(e.target.value));
          setTimeout(() => {
            
            let element=document.getElementById('cats');
            setcategoryChoosen(e.target.value);
            element.value=e.target.value 
            e.target.value="";
          }, 200);
        }

      }
      const deleteCategoryHandler=()=>{
        let element=document.getElementById('cats');
        reduxdispatch(deleteCategory(element.value));
        element.value="Choose category";
      }
      useEffect(()=>{ 
      },[])

      const deleteAttribute=(key)=>{
        let updatedAttributeTablevalues=attributesTable.filter((item)=>{
            if(item.key!==key)
            return item;
        })
        console.log(updatedAttributeTablevalues);
        setattributesTable(updatedAttributeTablevalues)
    }
    const addnewKeyValuepair=()=>{  
          reduxdispatch(saveattributetoCatDoc(newattkey,newattvalue,categoryChoosen));
          let keyalreadyexistintable=false;
          let newattributevalues=attributesTable.map((item)=>{
              if(item.key===newattkey)
              {
                  keyalreadyexistintable=true;
                  return {key:newattkey,value:newattvalue}
              }
              else
              return item;
          })
          if(!keyalreadyexistintable)
              {
                  newattributevalues.push({key:newattkey,value:newattvalue})
              }  
              setattributesTable(newattributevalues) 
          createnewattkey.current.value="";
          createnewattvalue.current.value=""
          setnewattkey(false);
          setnewattvalue(false);
}
    const newattrkeyhandler=(e)=>{
      e.preventDefault();
      setnewattkey(e.target.value)
      if(e.keyCode && e.keyCode===13)
      {
          if(newattkey && newattvalue)
          {
              addnewKeyValuepair();
          }
      }
    }
    const newattrvaluehandler=(e)=>{
        e.preventDefault();
        setnewattvalue(e.target.value);
        if(e.keyCode && e.keyCode===13)
      {
          if(newattkey && newattvalue)
          {
            addnewKeyValuepair();
          }
        
      }
      }
    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={1}>
            <Link to="/admin/products" className="btn btn-info my-3">
              Go Back
            </Link>
          </Col>
          <Col md={6}>
            <h1>Create a new product</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit} onKeyDown={(e)=>{if(e.code==='Enter')e.preventDefault()}}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" required type="text" />
              </Form.Group>
  
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  required
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCount">
                <Form.Label>Count in stock</Form.Label>
                <Form.Control name="count" required type="number" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control name="price" required type="text" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>
                  Category
                  <CloseButton onClick={deleteCategoryHandler} />(<small>remove selected</small>)
                </Form.Label>
                <Form.Select
                id="cats"
                  required
                  name="category"
                  aria-label="Default select example"
                  onChange={(e)=>{
                    categoryChange(e,categories,setattributesFromDb,setcategoryChoosen)
                    setcategoryChoosen(e.target.value);
                    console.log(e.target.value)
                  }}
                >
                  <option value="">Choose category</option>
                  {categories && categories.map((category,index)=>{
                     return <option key={index} value ={category.name}>{category.name}</option>
                  })}
                </Form.Select>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicNewCategory">
                <Form.Label>
                  Or create a new category (e.g. Computers/Laptops/Intel){" "}
                </Form.Label>
                <Form.Control onKeyUp={newCategoryHandler} name="newCategory" type="text" />
              </Form.Group>
                  
                {attributesFromDb.length>0 && (

              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                      ref={attkey}
                      onChange={(e)=>{onattschangeHandler(e,attvalue,attributesFromDb)}}
                    >
                      <option>Choose attribute</option>
                      {attributesFromDb.map((item,index)=>{

                      return <option key={index} value={item.key}>{item.key}</option>
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                    >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                    ref={attvalue}
                      name="atrrVal"
                      aria-label="Default select example"
                      onChange={(e)=>attributvalueChanged(e,attkey,attvalue,attributesTable,setattributesTable)}
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
                )}
  
              <Row>
                {attributesTable.length>0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                      {attributesTable.map((item,index)=>{
                        return  <Fragment key={index}>

                          <tr>
                          <td>{item.key}</td>
                          <td>{item.value}</td>
                          <td>
                            <CloseButton onClick={()=>deleteAttribute(item.key)} />
                          </td>
                        </tr> 
                          </Fragment>
                      })}
                  </tbody>
                </Table>
                )}
              </Row>
  
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                    <Form.Label>Create new attribute</Form.Label>
                    <Form.Control
                    ref={createnewattkey}
                      disabled={categoryChoosen==="" || categoryChoosen==='Choose category'}
                      placeholder="first choose or create category"
                      name="newAttrKey"
                      type="text"
                      onKeyUp={newattrkeyhandler}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicNewAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Control
                    ref={createnewattvalue}
                      disabled={categoryChoosen==="" || categoryChoosen==='Choose category'}
                      placeholder="first choose or create category"
                      required={newattkey}
                      name="newAttrValue"
                      type="text"
                      onKeyUp={newattrvaluehandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
  
              <Alert show={newattkey && newattvalue} variant="primary">
                After typing attribute key and value press enterr on one of the
                field
              </Alert>
  
              <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
                <Form.Label>Images</Form.Label>
  
                <Form.Control required type="file" multiple onChange={(e) => uploadHandler(e.target.files)} />
                {isCreating}
              </Form.Group>
              <Button variant="primary" type="submit">
                Create
              </Button>
              {createProductResponseState.error ?? ""}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default CreateProductPageComponent;
  
  