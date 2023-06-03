import React, { useEffect, useState } from "react";
import {Badge, Container, Nav, Navbar,Form, NavDropdown,DropdownButton,Dropdown, Button, InputGroup } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import {useDispatch ,useSelector} from 'react-redux'
import { getCategories } from "../redux/actions/categoryActions";
import socketIOClient from 'socket.io-client'
import { setChatRooms ,setSocket ,setMessageRecieved ,removeChatRoom} from '../redux/actions/chatActions'
export default function HeaderComponents() {
  const dispatch=useDispatch();
  const {userinfo}=useSelector((state)=>{return state.userRegisterLogin});
  const {itemsCount}=useSelector((state)=>{return state.cart});
  const {categories}=useSelector((state)=>state.getCategories);
  const {messageRecieved}=useSelector((state)=>state.adminChat);
  const [categorySelected,setcategorySelected]=useState("ALL");
  const [searchQuery,setsearchQuery]=useState("");
    const navigate=useNavigate();
  useEffect(()=>{
    dispatch(getCategories());
  },[])

    const submitHandler=(e)=>{ 
      if(e.keyCode && e.keyCode!==13)
        return ;
        e.preventDefault();
        console.log(categorySelected,searchQuery);
        if (searchQuery.trim()) {
          if (categorySelected === "ALL") {
              navigate(`/product-list/search/${searchQuery}`);
          } else {
              navigate(`/product-list/category/${categorySelected.replace(/\//g, ",")}/search/${searchQuery}`);
          }
      } else if (categorySelected !== "ALL") {
          navigate(`/product-list/category/${categorySelected.replace(/\//g, ",")}`);
      } else {
          navigate("/product-list");
      }
    }
    useEffect(()=>{
       
      if(userinfo.isAdmin)
      {
        var audio=new Audio('/audio/chat-msg1.mp3')
        const socket=new socketIOClient();
        socket.emit('admin connected with server',"Admin"+Math.floor(Math.random()*1000000000))
        socket.on("server sends message from client to admin",({user,message})=>{
          dispatch(setSocket(socket));
         //   let chatRooms = {
        //     fddf54gfgfSocketID: [{ "client": "dsfdf" }, { "client": "dsfdf" }, { "admin": "dsfdf" }],
        //   };
        dispatch(setChatRooms(user, message));         
        dispatch(setMessageRecieved(true));
        audio.play();
        })
        // if client disconnected 
        socket.on('disconnected',({reason,socketId})=>{
          // console.log('disconnected',reason,socketId);
          dispatch(removeChatRoom(socketId));
        })
        return ()=> socket.disconnect();
      }
    },[userinfo.isAdmin])
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{padding:"15px"}}>
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand  >EazyMart </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup  >
            <DropdownButton  id="dropdown-basic-button" title={categorySelected}  style={{color:"#e6e6e6"}} >
            
            <Dropdown.Item key={-1} onClick={()=>{setcategorySelected("ALL")}} >ALL</Dropdown.Item>
              {categories && categories.map((category,idx)=>{
                return <Dropdown.Item key={idx} onClick={()=>{setcategorySelected(category.name)}} >{category.name}</Dropdown.Item> 
              })} 
                
            </DropdownButton>
          <Form.Control type="text" onKeyUp={submitHandler} onChange={(e)=>setsearchQuery(e.target.value)} placeholder="Search in shop ..."style={{width:'550px'}} />
          <Button variant="warning" onClick={submitHandler}><i className="bi bi-search"></i></Button>
            </InputGroup>
            </Nav>
            <Nav>
              {userinfo.isAdmin?(

                <LinkContainer to="/admin/orders">
            <Nav.Link >Admin
              {messageRecieved && (
                <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
              )}
            </Nav.Link>
            </LinkContainer> 
              
              ):!userinfo.isAdmin && userinfo.name?(
                
                
                <NavDropdown title={`${userinfo.name} ${userinfo.lastName}`} id="basic-nav-dropdown">
              <NavDropdown.Item eventKey="/user/my-orders"  as={Link} to="/user/my-orders" href="#action/3.1">My Orders</NavDropdown.Item>
              <NavDropdown.Item eventKey="/user "  as={Link} to="/user " href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>dispatch(logout())} >Logout</NavDropdown.Item>
            </NavDropdown>
              ):(
                <>
                <LinkContainer to="/login">
            <Nav.Link >Login
               </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/register">
            <Nav.Link >Register
               </Nav.Link>
            </LinkContainer>
                </>
              )}

            {userinfo.isAdmin!==undefined && !userinfo.isAdmin?(

              <LinkContainer to="/cart">
            <Nav.Link >
             {itemsCount>0?(<Badge  pill bg="danger" >{itemsCount}</Badge>):null}  <i className="bi bi-cart4"></i><span className="ms-1">Cart</span>
               </Nav.Link>
            </LinkContainer>
              ):null}
             

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
