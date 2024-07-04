import React, { useState } from "react";
import dummy_logo from "../assets/images/dummy_logo.png";
import eye from "../assets/images/eye.png"
import offEye from "../assets/images/offEye.png"
import { useNavigate, useParams } from "react-router-dom";
import  Axios   from "axios";
 

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("")
  
  const {token} = useParams()
  const navigate = useNavigate() 

  const [passwordToggle, setPasswordToggle] = useState({
    password:false,
    confirmPassword:false,
  })
   
  const handlePasswordToggle = (e, key, value ) => {
    e.preventDefault();
    console.log("e",e);
    console.log("key",key);
    console.log("value",value)
    setPasswordToggle((prevData) => ({
      ...prevData,
      [key]:value
    }));
  }
  

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault()

    let formErrors = {};

    if (!password) {
      formErrors.password = "Password is required";
    }else if (password.length < 8) {
      formErrors.password = "Password should be at least 8 characters";
    }

    if (!confirmPassword){
      formErrors.confirmPassword = "Confirm password is required";
    }else if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }
     setErrors(formErrors)

    Axios.post(`http://localhost:8080/auth/resetpassword/${token}`, {
      password,
      confirmPassword,

    }).then((response) => {
         if(response.data.status) {
          console.log(response.data.status)
          alert('update password !')
          navigate('/login');
         }
         console.log(response.data)
    }).catch((err) => {
      console.log(err)
    });
    
  }
  return (
    <>
      <div className="login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-3 col-lx-6 col-lg-6 col-md-10 col-sm-11 col-11  mx-auto">
              <div className="login-form">
                <div className="header-img">
                  <img src={dummy_logo} alt="" />
                </div>
                <div className="heading-text">
                  <h3>Reset Password</h3>
                  <p>Please give some details to help fill out your account.</p>
                </div>
                <div className="form">
                  <form
                    className="row g-2"
                    onSubmit={handleResetPasswordSubmit}
                  >
                    <div className="col-md-12">
                      <label
                        htmlFor="newPassword"
                        className="custom-form-label"
                      >
                        New Password
                      </label>
                      <div className="possionIconInput" >
                        <img 
                        onClick={(e) => {
                          handlePasswordToggle(e,"password",!passwordToggle.password)
                        }}
                         src={passwordToggle.password ? eye : offEye}
                         alt=""
                         className="eyeIconView"
                         />
                      <input
                        className="custom-input-field"
                        type={passwordToggle.password ? "text" : "password"}
                        id="newPassword"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}  
                      />
                      </div>
                      {errors.password && (
                        <p className="required-validation">{errors.password}</p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <label
                        htmlFor="confirmPassword"
                        className="custom-form-label"
                      >
                        Confirm Password
                      </label>
                      <div className="possionIconInput" >
                        <img 
                        onClick={(e) => {
                          handlePasswordToggle(e,"confirmPassword",!passwordToggle.confirmPassword)
                        }}
                         src={passwordToggle.confirmPassword ? eye : offEye}
                         alt=""
                         className="eyeIconView"
                         />
                      <input
                        className="custom-input-field"
                        type={passwordToggle.confirmPassword ? "text" : "con"}
                        id="confirmPassword"
                        placeholder="Enter Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                      />
                      </div>
                      {errors.confirmPassword && (
                        <p className="required-validation">{errors.confirmPassword}</p>
                      )}
                    </div>
                    <div className="col-md-12 mt-4">
                      <button className="custom-btn">Reset Password</button>
                    </div>
                    <p className="d-flex mt-4 justify-content-center">
                      {/* <Link to="/forgot_password">Back</Link> */}
                      <span
                        onClick={() => {
                          navigate("/forgot_password");
                        }}
                        className="text-primary"
                      >
                        Back
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
