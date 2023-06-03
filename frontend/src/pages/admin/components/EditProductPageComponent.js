import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert,
    Image
  } from "react-bootstrap";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import { useEffect, useRef, useState } from "react"; 
  import { categoryChange ,onattschangeHandler,attributvalueChanged} from "./utils/utils";
  const onHover = {
      cursor: "pointer",
      position: "absolute",
      left: "5px",
      top: "-10px",
      transform: "scale(2.7)",
  }
export default function EditProductPageComponent({categories ,fetchProduct ,updateproductApiRequest,saveattributetoCatDoc,reduxDispatch,imageDeleteHandler ,uploadImagesApiRequest,uploadimagesCloudinaryAPirequest }) {
    const {id}=useParams();
        const attkey=useRef(null);
        const attvalue=useRef(null);
        const createNewattrkey=useRef(null);
        const createNewattrvalue=useRef(null);
        const [validated, setValidated] = useState(false);
        const [productdetails,setproductdetails]=useState({});
        const [updateerrormessage,setupdateerrormessage]=useState({message:"",error:""})
        const [attributesFromDb,setattributesFromDb]=useState({});
        const [attributesTable,setattributesTable]=useState([]);
        const [categoryChoosen,setcategoryChoosen]=useState("Choose category")
        const [newattrkey,setnewattrkey]=useState(false);
        const [newattrvalue,setnewattrvalue]=useState(false);
        const [imageremoved,setimageremoved]=useState(false);
        const [isuploading,setisuploading]=useState(false);
        const [imageuploaded,setimageuploaded]=useState(false);
        const navigate=useNavigate();

        const deleteAttribute=(key)=>{
            let updatedAttributeTablevalues=attributesTable.filter((item)=>{
                if(item.key!==key)
                return item;
            })
            console.log(updatedAttributeTablevalues);
            setattributesTable(updatedAttributeTablevalues)
        }
        
        
        const handleSubmit = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = event.currentTarget.elements;
            const forminputs={
                name:form.name.value,
                description:form.description.value,
                count:form.count.value,
                price:form.price.value,
                category:form.category.value,
                attributeTable:attributesTable,

            }
            if (event.currentTarget.checkValidity() === true) {
                console.log('calling for the update');
                updateproductApiRequest(id,forminputs).then((data)=>{
                        navigate('/admin/products')
                }).catch((err)=>{
                    console.log(err);
                    setupdateerrormessage({error:err.response.data?err.response.data:err.response.data})
                })
            }

            setValidated(true);
        };
        useEffect(()=>{
                fetchProduct(id).then((data)=>{
                    setproductdetails(data)
                    console.log(data);
                    }).
                catch((err)=>console.log(err));
        },[id,imageremoved,imageuploaded])

        useEffect(()=>{
            let categoryOfEditedProduct=categories.find((item)=>item.name===productdetails.category)
            if(categoryOfEditedProduct){
                const mainCategoryOfEditedProduct=categoryOfEditedProduct.name.split('/')[0];
                // console.log(mainCategoryOfEditedProduct);
                const mainCategoryOfEditedProductAllData=categories.find((item)=>item.name===mainCategoryOfEditedProduct);
                // console.log(mainCategoryOfEditedProductAllData);
                setattributesFromDb(mainCategoryOfEditedProductAllData.attrs);
                // console.log("the attbute from db is ",mainCategoryOfEditedProductAllData.attrs)
                setattributesTable(productdetails.attrs);
                setcategoryChoosen(productdetails.category)
                
            }
        },[productdetails])


        
    const checkKeyDown=(e)=>{ 
        if(e.code==='Enter'){
        e.preventDefault();}
    }
    const addnewKeyValuepair=(key,value)=>{ 
                 
                    reduxDispatch(saveattributetoCatDoc(newattrkey,newattrvalue,categoryChoosen));
                    let keyalreadyexistintable=false;
                    let newattributevalues=attributesTable.map((item)=>{
                        if(item.key===key)
                        {
                            keyalreadyexistintable=true;
                            return {key:key,value:value}
                        }
                        else
                        return item;
                    })
                    if(!keyalreadyexistintable)
                        {
                            newattributevalues.push({key:key,value:value})
                        } 
                        setattributesTable(newattributevalues) 
                    createNewattrkey.current.value="";
                    createNewattrvalue.current.value=""
                    setnewattrkey(false);
                    setnewattrvalue(false);
    }
    const newAttrKeyHandler=(e)=>{
            e.preventDefault();
             setnewattrkey(e.target.value);
             if(e.keyCode && e.keyCode===13)
             {
                if(newattrkey && newattrvalue)
                {
                    addnewKeyValuepair(newattrkey,newattrvalue)
                    console.log(attributesTable);
                }
             }
    }
    const newAttrValueHandler=(e)=>{
            e.preventDefault();
            setnewattrvalue(e.target.value);
            if(e.keyCode && e.keyCode===13)
             {
                if(newattrkey && newattrvalue)
                {
                    addnewKeyValuepair(newattrkey,newattrvalue)
                    console.log(attributesTable);

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
                <h1>Edit product</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit} onKeyDown={(e)=>checkKeyDown(e)}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" required type="text" defaultValue={productdetails.name} />
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
                        defaultValue={productdetails.description}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCount">
                    <Form.Label>Count in stock</Form.Label>
                    <Form.Control name="count" required type="number" defaultValue={productdetails.count} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="price" required type="text" defaultValue={productdetails.price} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>
                        Category
                        
                    </Form.Label>
                    <Form.Select
                        required
                        name="category"
                        aria-label="Default select example"
                        onChange={(e)=>categoryChange(e,categories,setattributesFromDb,setcategoryChoosen)}
                    >
                        <option value="Choose category">Choose category</option>
                        {categories && categories.map((category,index)=>{
                            return category.name===productdetails.category?(
                                <option selected key={index} value={category.name}>{category.name}</option>
                            ):(
                                <option key={index} value={category.name}>{category.name}</option>
                            )
                         
                        })} 
                    </Form.Select>
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
                            onChange={(e)=>onattschangeHandler(e,attvalue,attributesFromDb)}
                        >
                            <option >Choose attribute</option>
                            {attributesFromDb.map((item,index)=>
                            <option key={index} value={item.key}>{item.key}</option>
                            )}
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
                            name="atrrVal"
                            aria-label="Default select example"
                            ref={attvalue}
                            onChange={(e)=>attributvalueChanged(e,attkey,attvalue,attributesTable,setattributesTable)}
                        >
                            <option>Choose attribute value</option>
                        </Form.Select>
                        </Form.Group>
                    </Col>
                    </Row>
                    )}

                    <Row>
                        {attributesTable && attributesTable.length>0 && (

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
                          return  <tr key={index}> 
                            <td>{item.key}</td>
                            <td>{item.value}</td>
                            <td>
                            <CloseButton onClick={()=>deleteAttribute(item.key)}/>
                            </td>
                        </tr>
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
                        ref={createNewattrkey}
                            disabled={categoryChoosen==='Choose category'}
                            placeholder="first choose or create category"
                            name="newAttrKey"
                            type="text"
                            onKeyUp={newAttrKeyHandler}
                            required={newattrvalue}
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
                        ref={createNewattrvalue}
                            disabled={categoryChoosen==='Choose category'}
                            placeholder="first choose or create category"
                            required={newattrkey}
                            name="newAttrValue"
                            type="text"
                            onKeyUp={newAttrValueHandler}
                        />
                        </Form.Group>
                    </Col>
                    </Row>

                    <Alert variant="primary" show={newattrkey && newattrvalue}>
                    After typing attribute key and value press enterr on one of the
                    field
                    </Alert>

                    <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
                    <Form.Label>Images</Form.Label>
                        <Row>
                            {productdetails.images && productdetails.images.map((image,idx)=>{

                             return   <Col key={idx} style={{position: "relative"}} xs={3}>
                            <Image crossOrigin="anonymous" src={image.path ?? null} fluid />
                            <i style={onHover} className="bi bi-x text-danger" onClick={()=>{
                                imageDeleteHandler(image.path,id).then((data)=>setimageremoved(!imageremoved))}}></i>
                            </Col> 
                            })}
                            
                        </Row>
                    <Form.Control  type="file" multiple onChange={(e)=>{
                        setisuploading('upload files in progress ...')
                         if(process.env.NODE_ENV!=='production'){
                                console.log('calling for uploadimageAPIrequest');
                                uploadImagesApiRequest(e.target.files,id).then((data)=>{
                                    setisuploading('upload file completed');
                                }).catch((err)=>{
                                    setisuploading(err.response.data.message);
                                })
                         }
                         else{
                            uploadimagesCloudinaryAPirequest(e.target.files,id);
                            setisuploading('upload files is completed. wait for it refresh page if neccassary')
                            setTimeout(() => {
                                setimageuploaded(!imageuploaded)
                            }, 5000);
                         }
                    }}/>
                    {isuploading}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    UPDATE
                    </Button>
                    {updateerrormessage.error ?? ""}
                </Form>
                </Col>
            </Row>
            </Container>
        );
        }

