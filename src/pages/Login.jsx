import React,{useState, useEffect} from "react" 
import { Link,useNavigate } from "react-router-dom"
import {ToastContainer, toast} from 'react-toastify'
import { useCookies } from "react-cookie";
import axios from 'axios'
import '../styles/style.css'

export default function Login() {
    
    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.jwt) {
          navigate("/");
        }
      }, [cookies, navigate]);
    const [values,setValues] = useState({
        email:"",
        password:""
    });

    const generateError = (err) => 
        toast.error((err),{
            position: 'bottom-right',
        })

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post("api/users/login",{
                ...values,
            },
            {
                withCredentials: true
            });
            if(data){
                if(data.errors){
                    const { email, password, isActive } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                    else if (isActive) generateError(isActive);
                }else{
                    navigate("/")
                }
            }
        } catch (error) {
            alert("You are banned")
            console.log(error);
        }
    }
  return (
    <div className="my-block">
        <div className="container my-form">
            <h2>Sign In</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        placeholder="Email"
                        onChange={(e) => setValues({...values, [e.target.name]: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        className="form-control" 
                        placeholder="Password"
                        onChange={(e) => setValues({...values, [e.target.name]: e.target.value})} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary form-control" type="submit">Sign in</button>
                </div>
                <div className="mb-3">
                    <p>Not registered yet? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
        <ToastContainer />
    </div>
    
  )
}