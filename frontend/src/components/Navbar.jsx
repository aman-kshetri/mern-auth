import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

    const sendVerificationOtp = async()=> {
      try {
        axios.defaults.withCredentials = true;

        const {data} = await axios.post(backendUrl + '/api/auth/sendVerifyOtp')
        if (data.success) {
          navigate('/email-verify')
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  
    const logout = async ()=>{
      try {
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(backendUrl+ '/api/auth/logout')
        data.success && setIsLoggedin(false)
        data.success && setUserData(false)
        navigate('/')

      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="" className="w-28 sm:w-32" />

      {userData ? (
        <div>{userData.name[0].toUpperCase()}
          <ul>
            {!userData.isAccountVerified && 
            <li onClick={sendVerificationOtp}>Verify Email</li>}

            <li onClick={logout}>Logout</li>
          </ul>
        </div>
      ) : (
        <button onClick={() => navigate("/login")} className="">
          Login <img src={assets.arrow_icon} alt="" />{" "}
        </button>
      )}
    </div>
  );
};

export default Navbar;
