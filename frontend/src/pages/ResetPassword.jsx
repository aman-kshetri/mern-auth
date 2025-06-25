import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);


  const inputRefs = React.useRef([])
  
    const handleInput = (e, index) => {
      if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
        inputRefs.current[index+1].focus();
      }
    }
  
    const handleKeyDown = (e, index) => {
      if (e.key==='Backspace' && e.targrt.value=== '' && index>0) {
        inputRefs.current[index-1].focus();
      }
    }
  
    const handlePaste = (e) => {
      const paste = e.clipboardData.getData('text')
      const pasteArray = paste.split('');
      pasteArray.forEach((char, index)=>{
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char
        }
      })
    }

    const onSubmitEmail = async(e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && setEmailSent(true)
      } catch (error) {
        toast.error(error.message)
      }
    }

    const onSubmitOtp = async(e) => {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e=> e.value)
      setOtp(otpArray.join(''))
      setIsOtpSubmitted(true)
    }

    const onSubmitNewPassword = async(e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && navigate('/login')
      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
    <div>
      <img onClick={() => navigate("/")} src={assets.logo} alt="" />
      {/* Enter Email to reset Password */}

      {!isEmailSent && 
      <form onSubmit={onSubmitEmail}>
        <h1>Reset password</h1>
        <p>Enter your registered email address</p>
        <div>
          <img src={assets.mail_icon} alt="" />
          <input type="email" placeholder="Email id" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button>Submit</button>
      </form>
      }


      {/* OTP input form */}
      {!isOtpSubmitted && isEmailSent &&
      <form onSubmit={onSubmitOtp}>
        <h1>Reset password OTP</h1>
        <p>Enter the 6-digit code sent to your email</p>
        <div onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index)=> (
            <input type="text" maxLength='1' key={index} required 
            ref={e=> inputRefs.current[index] = e}
            onInput={(e)=>handleInput(e,index)}
            onKeyDown={(e)=> handleKeyDown(e,index)}
            /> 
          ))}
        </div>
        <button>Verify email</button>
      </form>
      }

      {/* Enter new password */}
      {isOtpSubmitted && isEmailSent &&
      <form onSubmit={onSubmitNewPassword}>
        <h1>New password</h1>
        <p>Enter the new password below</p>
        <div>
          <img src={assets.lock_icon} alt="" />
          <input type="password" placeholder="Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        </div>
        <button>Submit</button>
      </form>
      }


    </div>
  );
};

export default ResetPassword;
