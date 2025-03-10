import { useState } from "react"
import { Link } from "react-router-dom";
const SignupPage = () => {
    const [isOtpSent,setIsOtpSent]=useState(false);
    const handleSendOtp=async(e)=>{
      e.preventDefault();
      const email=e.target.email.value;
      if(!isOtpSent){
        const resp=await fetch(import.meta.env.VITE_BACKEND_URL+"/api/v1/otps",{
            method: "POST",
            body: JSON.stringify({email: email}),
            headers:{
                "content-type": "Application/json",
    
            },
          });
          const respObj=await resp.json();
          if(respObj.status==="success"){
            alert(respObj.message);
            setIsOtpSent(true);
          }
          else{
            alert(respObj.message);
          }
      }
      else{
          const otp=e.target.otp.value;
          const password=e.target.password.value;
          const cpassword=e.target.cpassword.value;
          if(cpassword!==password){
            alert("password does not match");
            return;
          }
          const resp=await fetch(import.meta.env.VITE_BACKEND_URL+"/api/v1/users",{
            method: "POST",
            body: JSON.stringify({email,otp,password}),
            headers:{
                "content-type": "Application/json",
    
            },
          });
          const respObj=await resp.json();
          if(respObj.status=="success"){
            setIsOtpSent(true);
          }
          else{
            alert(respObj.message);
          }
      }
    }
   
  return (
    <div>
      <Link to="/login">login</Link>
      <form onSubmit={handleSendOtp}>
        <div>
        <label>Email</label>
        <input name="email" type="email"/>
        </div>
        {!isOtpSent ? (<button>SendOTP</button>):
        (
            <div>
        <div>
        <label>OTP</label>
        <input name="otp" type="text"/>
        </div>
        <div>
        <label>password</label>
        <input name="password" type="password"/>
        </div>
        <div>
        <label>confirm password</label>
        <input name="cpassword" type="password"/>
        </div>
        <button>SignUP</button>
        </div>
        )}
      </form>
    </div>
  )
}

export default SignupPage
