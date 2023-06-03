import React from 'react'
import { Nav, Navbar, NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/userActions'
export default function AdminLinksComponent() {
    const dispatch=useDispatch();
  return (
    <Navbar style={{backgroundColor:"white"}}>
     <Nav className="flex-column">
        <LinkContainer to="/admin/orders">
            <Nav.Link>Orders</Nav.Link>
        </LinkContainer> 
        <LinkContainer to="/admin/products">
            <Nav.Link>Products</Nav.Link>
        </LinkContainer> 
        <LinkContainer to="/admin/users">
            <Nav.Link>Users</Nav.Link>
        </LinkContainer> 
        <LinkContainer to="/admin/chats">
            <Nav.Link>Chats</Nav.Link>
        </LinkContainer> 
        <LinkContainer to="/admin/analytics">
            <Nav.Link>Analytics</Nav.Link>
        </LinkContainer>  
            <Nav.Link onClick={()=>dispatch(logout())}>Log out</Nav.Link> 
     </Nav>
    </Navbar>
  )
}
