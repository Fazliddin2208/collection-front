import React,{useEffect,useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import {useCookies} from 'react-cookie'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

export default function Main() {

  const [check, setCheck] = useState({status:''})

  const del=(elem)=>{
    console.log(elem);
    axios.delete(`api/users/${elem._id}`)
  }

  const updateStatus=async(elem)=>{
      console.log(elem.isActive);
      if(elem.isActive===true){
          check.isActive=false
      }else{
          check.isActive=true
      }
      await axios.put(`api/users/${elem._id}`, check)
  }

  const [admin, setAdmin] = useState({role:''})
  
  const updateAdmin=(elem)=>{
    console.log(elem.isAdmin);
    if(elem.isAdmin===false){
        admin.isAdmin=true
    }else{
        admin.isAdmin=true
    }
    
    axios.put(`api/users/admin/${elem._id}`, admin)
  }

  const [users,setUsers]=useState([]);

  useEffect(()=>{
    fetchUsers()
  },[users,del,updateStatus,updateAdmin])

  const fetchUsers = async() =>{
    const response = await axios.get('/api/users')
    const users = await response.data
    console.log(users, typeof(users));
    setUsers(users)
  }

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="container">
        <div className="header d-flex flex-row justify-content-between">
          <h1 className="col col-md-2"><Link to="/">Salom</Link></h1>
          <h3><Link to="/me">Profile</Link></h3>
          <button className="btn btn-dark col col-md-2" onClick={logOut}>Log Out <i className="fa-solid fa-right-from-bracket"></i></button>
        </div>
        
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                {/* <th>Registration time</th>
                <th>Last login time</th> */}
                <th>Status</th>
                <th>Actions</th>
                <th>Role</th>
              </tr>
            </thead>
            {users.map((user,index) => (
              <tbody key={user._id}>
                <tr>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {/* <td>{user.regTime}</td>
                  <td>{user.loginTime}</td> */}
                  {/* <td>{user.isActive}</td> */}
                  <td>{user.isActive ? 
                        <h6 className='text-success'>Active</h6>
                        : <h6 className='text-dark'>Block</h6>
                      }
                  </td>

                  <td>
                    <button onClick={()=>updateStatus(user)} className={user.isActive ? 'btn btn-dark':'btn btn-success'}>
                        {
                            user.isActive ? "Block" : "Active"
                        }
                    </button>
                    <button className='btn btn-danger mx-2' onClick={()=>del(user)}>Delete</button>
                  </td>

                  <td>{user.isAdmin ? 
                        <h6 className='text-success'>Admin</h6>
                        : <h6 className='text-dark'>User</h6>
                      }
                  </td>

                  <td>
                    <button onClick={()=>updateAdmin(user)} className={user.isAdmin ? 'btn btn-primary':'btn btn-success'}>
                        {
                            user.isAdmin ? "Promote to user" : "Promote to admin"
                        }
                    </button>
                    
                  </td>

                </tr>
              </tbody>

            ))}
          </table>
        
        {/* {users.map((user) => (
          <div>
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
            <h3>{user.password}</h3>
            <h3>{user._id}</h3>
          </div>
        ))} */}
        <ToastContainer />
      </div>
    </>
  )
}