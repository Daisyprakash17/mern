import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function UserProfilePageComponent({updateUserApiRequest ,fetchUser,userinfofromredux,reduxdispatch,setReduxUserState})  {
    const [validated, setValidated] = useState(false);
    const [updateResponse,setupdateResponse]=useState({success:"",error:""})

    const [user,setuser]=useState({});
    const userinfo=userinfofromredux;
    useEffect(()=>{
            fetchUser(userinfo._id).then((data)=>{
                setuser(data)
            }).catch((err)=>[
                console.log(err) 
            ])
    },[])


    const onChange = () => {
      const password = document.querySelector("input[name=password]");
      const confirm = document.querySelector("input[name=confirmPassword]");
      if (confirm.value === password.value) {
        confirm.setCustomValidity("");
      } else {
        confirm.setCustomValidity("Passwords do not match");
      }
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
      const form = event.currentTarget.elements;
      const name=form.name.value;
      const lastName=form.lastName.value;
      const phoneNumber=form.phoneNumber.value;
      const address=form.address.value;
      const country=form.country.value;
      const zipCode=form.zipCode.value;
      const city=form.city.value;
      const state=form.state.value;
      const password=form.password.value;
      const confirmPassword=form.password.value;
      if (event.currentTarget.checkValidity() === true && password===confirmPassword ) {
        updateUserApiRequest(name,lastName,phoneNumber,address,country,zipCode,city,state,password).then((data)=>{
                console.log(data);
        setupdateResponse({success:data.success,error:""})
        reduxdispatch(setReduxUserState({doNotLogout:userinfo.doNotLogout,...data.userUpdated}));
        if(userinfo.doNotLogout)
        window.localStorage.setItem('userinfo',JSON.stringify({doNotLogout:true,...data.userUpdated}))
        else
        window.sessionStorage.setItem('userinfo',JSON.stringify({doNotLogout:false,...data.userUpdated}))
        
        }).catch((err)=>{
            setupdateResponse({err:(err.response.data.message ? err.response.data.message : err.response.data)})
        })
      }
  
      setValidated(true);
    };
    // intaillly these values are using dumpu default
    // but later i will get the data from the database to 
    // fill the form default values
    return (
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={6}>
            <h1>Update your Profile Details</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={user.name}
                  name="name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Your last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={user.lastName}
                  name="lastName"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  disabled
                  value={`${user.email} if you want to change email, remove account and create new account`}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  defaultValue={user.phoneNumber}
                  name="phoneNumber"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your street name and house number"
                  defaultValue={user.address}
                  name="address"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your country"
                  defaultValue={user.country}
                  name="country"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicZip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Zip code"
                  defaultValue={user.zipCode}
                  name="zipCode"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your city"
                  defaultValue={user.city}
                  name="city"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your state"
                  defaultValue={user.state}
                  name="state"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  required
                  type="password"
                  placeholder="Password"
                  minLength={6}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please anter a valid password
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
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
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Both passwords should match
                </Form.Control.Feedback>
              </Form.Group>
  
              <Button variant="primary" type="submit" className="mb-3">Update</Button>
               <Alert show={updateResponse && updateResponse.error!==""} variant="danger">
                Something went wrong
              </Alert> 
              <Alert show={updateResponse && updateResponse.success==="user updated"} variant="info">
                Details Updated
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  