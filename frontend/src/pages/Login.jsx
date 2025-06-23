import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from 'axios';
import { toast } from 'react-toastify'

const Login = () => {

  const navigate = useNavigate();

  const {backendUrl, setIsLoggedin} = useContext(AppContent)

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;


      if(state=== 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password})

        if (data.success) {
          setIsLoggedin(true)
          getUserData();
          navigate('/')
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})

        if(data.success){
          setIsLoggedin(true)
          getUserData();
          navigate('/')
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <img onClick={()=> navigate('/')} src={assets.logo} alt="" />

      <div>
        <h2>{state === "Sign Up" ? "Create account" : "Login"}</h2>
        <p>
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div>
              <img src={assets.person_icon} alt="" />
              <input onChange={e=> setName(e.target.value)} value={name} type="text" placeholder="Full name" required />
            </div>
          )}

          <div>
            <img src={assets.mail_icon} alt="" />
            <input onChange={e=> setEmail(e.target.value)} value={email} type="email" placeholder="Email id" required />
          </div>

          <div>
            <img src={assets.lock_icon} alt="" />
            <input onChange={e=> setPassword(e.target.value)} value={password} type="password" placeholder="Passsword" required />
          </div>

          <p onClick={()=> navigate('/reset-password')}>Forgot password?</p>

          <button>{state}</button>
        </form>

        {state === "Sign Up" ? (
          <p>
            Already have and account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")}>Sign Up</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
