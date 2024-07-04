import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "./HeaderDash";
import changePassword from "../assets/images/changePassword.png";
import eye from "../assets/images/eye.png"
import offEye from "../assets/images/offEye.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Change_password({ isOpen, setIsOpen }) {
     const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  
  const [passwordToggle, setPasswordToggle] = useState({
    oldPassword: false,
    confirmPassword: false,
    newPassword : false,
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
  

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};

    if (!oldPassword) {
      formErrors.oldPassword = "Password is required";
    }else if (oldPassword.length < 8) {
      formErrors.oldPassword = "Password should be at least 8 characters";
    }

    if (!newPassword) {
      formErrors.newPassword = "Password is required";
    }else if (newPassword.length < 8) {
      formErrors.newPassword = "Password should be at least 8 characters";
    }

    if (!confirmPassword){
      formErrors.confirmPassword = "Confirm password is required";
    }else if (newPassword !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(formErrors);

    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log("id",userId);

    

    const fun = async (req, res) => {
      try {
        const res = await axios.put(`http://localhost:8080/auth/changepassword/${userId}`,data);
        console.log(res.data.status);
        if (res.data.status) {
         navigate("/dashboard");
        }
      } catch (err) {
        console.log();
      }
      
    };
    fun();
  };
     
  return (
    <>
      <div className="wapper">
        <Sidebar isOpen={isOpen} />
        <div className={`main-container ${isOpen && "main-content_large"}`}>
          <HeaderDash isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="content">
            <div className="row mb-3">
              <div className="col-xxl-12">
                <div className="htmlForm-body">
                  <div className="row">
                    <div className="col-xxl-12">
                      <div className="greetingsText mb-3">
                        <div className="greetingsText-heading">
                          <h3>Change Password</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 align-self-center">
                      <img src={changePassword} alt="" className="img-fluid" />
                    </div>
                    <div className="col-lg-6 align-self-center">
                      <form className="row g-3">
                        <div className="col-md-12">
                          <label
                            htmlFor="oldpassword"
                            className="custom-htmlForm-label"
                          >
                            Old Password{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <div className="possionIconInput" >
                        <img 
                        onClick={(e) => {
                          handlePasswordToggle(e,"oldPassword",!passwordToggle.oldPassword)
                        }}
                         src={passwordToggle.oldPassword ? eye : offEye}
                         alt=""
                         className="eyeIconView"
                         />
                          <input
                            type={passwordToggle.oldPassword ? "text" : "password"}
                            className="custom-input-field"
                            id="oldpassword"
                            placeholder="Enter Old Password"
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                          </div>
                           {errors.oldPassword && (
                      <p className="required-validation">{errors.oldPassword}</p>
                    )}
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="newpassword"
                            className="custom-htmlForm-label"
                          >
                            New Password{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <div className="possionIconInput" >
                        <img 
                        onClick={(e) => {
                          handlePasswordToggle(e,"newPassword",!passwordToggle.newPassword)
                        }}
                         src={passwordToggle.newPassword ? eye : offEye}
                         alt=""
                         className="eyeIconView"
                         />
                          <input
                            type={passwordToggle.newPassword ? "text" : "password"}
                            className="custom-input-field"
                            id="newpassword"
                            placeholder="Enter New Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          </div>
                          {errors.newPassword && (
                      <p className="required-validation">{errors.newPassword}</p>
                    )}
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="confirmpassword"
                            className="custom-htmlForm-label"
                          >
                            Confirm Password{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <div className="possionIconInput" >
                        <img 
                        onClick={(e) => {
                          handlePasswordToggle(e,"confirmPassword",!passwordToggle.confirmPassword)
                        }}
                         src={passwordToggle.confirmPassword? eye : offEye}
                         alt=""
                         className="eyeIconView"
                         />
                          <input
                            type={passwordToggle.confirmPassword ? "text" : "password"}
                            className="custom-input-field"
                            id="confirmpassword"
                            placeholder="Enter Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          </div>
                          {errors.confirmPassword && (
                      <p className="required-validation">{errors.confirmPassword}</p>
                    )}
                        </div>

                        <div className="col-md-12 mt-4">
                          <button
                              onClick={handleSubmit}
                            className="custom-btn col-md-4"
                          >
                            Change Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Change_password;
