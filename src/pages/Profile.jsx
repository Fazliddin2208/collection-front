import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";

const Profile = () => {

  // const [cookies] = useCookies([]);
  const [cookies, setCookie, removeCookie] = useCookies([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.jwt) {
          navigate("/me");
        }else{
          navigate("/register")
        }
      }, [cookies, navigate]);

  const [user,setUser]=useState([]);

  useEffect(()=>{
    fetchUser()
  },[user])

  const fetchUser = async() =>{
    const response = await axios.get('/api/users/me')
    const user = await response.data
    setUser(user)
  }

  // const navigate = useNavigate();
  // const [cookies, setCookie, removeCookie] = useCookies([]);
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
        <div>
          
          
          <h4>Hello: {user.name}</h4>
          <h4>Your email: {user.email}</h4>
          <button className="btn btn-dark col col-md-2" onClick={logOut}>Log Out <i className="fa-solid fa-right-from-bracket"></i></button>

          <div className="my-cards row" >
            {user.collections && user.collections.map((collection)=>(
              <div className="card my-card sm-3">
                <img
                  src={require("../assets/book.jpg")}
                  className="card-img-top"
                  alt="This is item's image"
                />
                <div className="card-body">
                  <h5 className="card-title">{collection.title}</h5>
                  <p className="card-text">
                    {collection.desc}
                  </p>
                  {collection.tegs.map((teg)=>(
                    <a href="#" className="my-teg">
                      {teg}
                    </a>
                  ))}
                </div>
                <div className="card-footer">
                  <div className="my-action">
                      <i className="fas fa-heart"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
          

        </div>
    );
};


export default Profile;