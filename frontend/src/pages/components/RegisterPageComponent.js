import { Container, Row, Col, InputGroup, Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
export default function RegisterPageComponent({registerUserApiRequest ,reduxdispatch, setReduxUserState})  {
    const [validated, setValidated] = useState(false);
    const [registerResponse,setregisterResponse]=useState({success:"",error:"",loading:false})
    const onchange=()=>{
      // here we are checking that both password should be matched
        const password=document.querySelector("input[name=password]");
        const confirmpassword=document.querySelector('input[name=confirmPassword]'); 
        if(password.value===confirmpassword.value)
        confirmpassword.setCustomValidity("");
        else
        confirmpassword.setCustomValidity("both password show match");
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
      const form = event.currentTarget.elements;
      const name=form.name.value;
      const lastName=form.lastName.value
      const email=form.email.value;
      const password=form.password.value
      const confirmPassword=form.confirmPassword.value;
      console.log(form);
      if (event.currentTarget.checkValidity() === true && name && lastName && password && email  &&password===confirmPassword) {
        setregisterResponse({loading:true})
        registerUserApiRequest(name,lastName,email,password).then((data)=>{
            setregisterResponse({sucess:data.message, loading:false, error:""})
             reduxdispatch(setReduxUserState(data.userCreated));
             sessionStorage.setItem('userinfo',JSON.stringify(data.userCreated))
             if(data.message==='User created')
             window.location.href="/user";
        }).catch((err)=>[   
            setregisterResponse({error:err.response.data.message?err.response.data.message:err.response.data})
        ])
      }
  
      setValidated(true);
    };
    return (
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={6}>
            <h1>Register</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}> 
  
                <Form.Group className="mb-3"   controlId="validationCustom01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your first name"
                    name="name" 
                  />
                  <Form.Control.Feedback type="invalid">Please Enter your first Name</Form.Control.Feedback>
                </Form.Group>
                 
                <Form.Group className="mb-3"   controlId="formBasicLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName" 
                  />
                  <Form.Control.Feedback type="invalid">Please Enter your last Name</Form.Control.Feedback>
                </Form.Group>
  
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  required
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">
                  Please anter a valid email address
                </Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  required
                  type="password"
                  placeholder="Password"
                  minLength={6}
                  onChange={onchange}
                />
                <Form.Control.Feedback type="invalid">  Please anter a valid password </Form.Control.Feedback>
                <Form.Text >
                  Password should have at least 6 characters
                </Form.Text>
              </Form.Group>
  
                <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control
                    name="confirmPassword"
                    required
                    type="password"
                    placeholder="Repeat Password"
                    minLength={6}
                    onChange={onchange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Both passwords should match
                  </Form.Control.Feedback>
                </Form.Group>
  
                <Row className="pb-2">
                <Col>
                  Do you have an account already?
                  <Link to={"/login"}> Login </Link>
                </Col>
              </Row>
  
             
              <Button type="submit">
                {registerResponse && registerResponse.loading===true?(<Spinner  as="span" animation="border"  size="sm"  role="status" aria-hidden="true" />):""}
                
                Submit
              </Button>
  
              <Alert show={registerResponse && registerResponse.error==='user already exists'} variant="danger" className="mt-3">
                  User with that email already exists!
              </Alert>
  
              <Alert show={registerResponse && registerResponse.error==='User created'} variant="info">
                  User created
              </Alert>
  
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
