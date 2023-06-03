import { Container, Row, Col, InputGroup, Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function LoginPageComponent({loginUserApiRequest,reduxdispatch,setReduxUserState}) {
    const navigate=useNavigate();
    const [validated, setValidated] = useState(false);
    const [loginresponse,setloginresponse]=useState({success:"",error:"",loading:false});
     
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
      const form = event.currentTarget.elements;
      const email =form.email.value;
      const password=form.password.value;
      const doNotLogout=form.doNotLogout.checked;
    //   console.log(email,password,doNotLogout)
      if (event.currentTarget.checkValidity() === true && email && password) {
        setloginresponse({loading:true});
        loginUserApiRequest(email,password,doNotLogout).then((res)=>{
            console.log(res)
            
            setloginresponse({sucess:res.message,loading:false,error:""})
            if(res.userloggedIn)
            reduxdispatch(setReduxUserState(res.userloggedIn))
            if(res.message==='user logged in !' && !res.userloggedIn.isAdmin)
                window.location.href="/user"
            else 
            window.location.href="/admin/orders" 
          })
        .catch((err)=>{
            setloginresponse({error:err.response.data.message?err.response.data.message:err.response.data})
        })
      }
  
      setValidated(true);
    };
    return (
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={6}>
            <h1>Login</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}> 
  
                 
  
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  required
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  required
                  type="password"
                  placeholder="Password" 
                /> 
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicCheckbox">  
                <Form.Check
                  name="doNotLogout" 
                  type="checkbox"  
                  label='Do not Logout'
                /> 
              </Form.Group>
  
                <Row className="pb-2">
                <Col>
                  Don't have an account
                  <Link to={"/register"}> Register </Link>
                </Col>
              </Row>
  
             
              <Button variant="primary"  type="submit">
                {loginresponse && loginresponse.loading===true ?(<Spinner as="span" animation="border" size="sm"  role="status" aria-hidden="true" />):""}
                
                Login
              </Button> 
  
              <Alert show={loginresponse && loginresponse.error==='wrong credentials'} variant="danger" className="mt-3">
                  Wrong credentials
              </Alert>
  
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  