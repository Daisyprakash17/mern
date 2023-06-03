
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useEffect, useState } from "react";


import { logout } from "../../../redux/actions/userActions";
 import { useDispatch } from "react-redux";
//["bi bi-check-lg text-success", "bi bi-x-lg text-danger"]
export default function UsersPageComponent({fetchusers,deleteuser}) {
    
    const [users,setUsers]=useState([]);
    const [userdeleted,setUserdeleted]=useState(false);
    const dispatch=useDispatch();

    const deleteHandler =async (userid) => {
        if(window.confirm("Are you sure?")){
            const data=await deleteuser(userid)
            if(data==='user deleted')
            setUserdeleted(!userdeleted);
        }
    }

    useEffect(()=>{
        const abctrl=new AbortController();
        fetchusers(abctrl)
        .then(res=>{setUsers(res)})
        .catch((err)=>{
          dispatch(logout())

          // console.log(err.response.data.message?err.response.data.message:err.response.data)
        });
        return()=>{abctrl.abort()}
    },[userdeleted])
    
    return (
      <Row className="m-5">
          <Col md={2}> 
        <h1>Admin Links</h1>
          <AdminLinksComponent />
          </Col>
        <Col md={10}>
          <h1>User List</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Is Admin</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
                
              {users.map(
                (user, idx) => (
                  <tr key={idx}>
                    <td>{idx +1}</td>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                        {user.isAdmin?<i className="bi bi-check-lg text-success"></i> :<i className="bi bi-x-lg text-danger"></i>}
                      <i  ></i>
                    </td>
                    <td>
                      <LinkContainer to={`/admin/edit-user/${user._id}`}>
                          <Button className="btn-sm">
                              <i className="bi bi-pencil-square"></i>
                          </Button>
                      </LinkContainer>
                      {" / "}
                      <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(user._id)}>
                          <i className="bi bi-x-circle"></i>
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  };
