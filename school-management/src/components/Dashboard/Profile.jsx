import React, { useState } from "react";
import axios from "axios";
import profileImage from "../assets/images/profileImage.png";
import camera from "../assets/images/camera.png";
import dummyProfile from "../assets/images/dummyProfile.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "./HeaderDash";

function Profile({ isOpen, setIsOpen }) {

     const [loggedAdmin, setLoggedAdmin] = useState(JSON.parse(localStorage.getItem('user')))
     console.log(loggedAdmin);
   
     const navigate = useNavigate()
   
     const handleChange = (e) => {
       console.log(handleChange );
       const {name, value} = e.target;
       console.log("name is", name);
       console.log("value is", value);
       setLoggedAdmin((prevData) => ({
         ...prevData,
         [name] : value,
       }))
     }
   
     const handleSubmit = (e) => {
       e.preventDefault();
       console.log("logged admin int handle submit profile",loggedAdmin);
       const id = loggedAdmin._id;
       console.log("id in profile handle submit",id);
       const fun = async (req, res) => {
         try {
           const res =  await axios.put(`http://localhost:8080/auth/updateprofile/${id}`, loggedAdmin)
             console.log("response is",res.data)
             if(res.data.status){
               localStorage.setItem('user',JSON.stringify(res.data.updatedProfileUser))
               navigate('/dashboard')
             }
         }
          catch (error) {
           console.log(error);
         }
        
       }
       fun();
     }
  return (
    <>
      <div className="wapper">
        <Sidebar isOpen={isOpen}  />
        <div
          className={`main-container ${isOpen && "main-content_large"}`}
        >
          <HeaderDash isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="content">
            <div className="row mb-3">
              <div className="col-xxl-12">
                <div className="htmlForm-body">
                  <div className="row">
                    <div className="col-xxl-12">
                      <div className="greetingsText mb-3">
                        <div className="greetingsText-heading">
                          <h3>Profile</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 align-self-center">
                      <img
                        src={profileImage}
                        alt=""
                        className="img-fluid"
                      />
                    </div>

                    <div className="col-lg-6 align-self-center">
                      <form className="row g-3">
                        <div className="col-md-12">
                          <div className="addProjectlogo">
                            <div className="upload-img-box">
                              <div className="circle">
                                <img
                                  src={dummyProfile}
                                  alt=""
                                />
                              </div>
                              <div className="p-image ml-auto">
                                <label htmlFor="logoSelect">
                                  <div>
                                    <img
                                      src={camera}
                                      alt=""
                                    />
                                  </div>
                                </label>
                                <input
                                  className="file-upload"
                                  id="logoSelect"
                                  name="projectLogo"
                                  type="file"
                                  accept="image/*"
                                />
                              </div>
                            </div>
                            <h6>Profile Image</h6>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="fullname" className="custom-htmlForm-label">
                            Full Name{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            value={loggedAdmin.name}
                            name="name"
                            onChange={handleChange }
                          />
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="email" className="custom-htmlForm-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className="custom-input-field"
                            id="email"
                            value={loggedAdmin.email}
                            name="email"
                            onChange={handleChange }
                          />
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="contact-number"
                            className="custom-htmlForm-label"
                          >
                            Contact Number{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="contact-number"
                            value={loggedAdmin.phoneNumber}
                            name="phoneNumber"
                            onChange={handleChange }
                          />
                        </div>
                        <div className="col-md-12">
                          <label htmlFor="address" className="custom-htmlForm-label">
                            Address
                          </label>
                          <textarea
                            type="text"
                            className="custom-input-field"
                            id="address"
                            rows="4"
                          >
                          </textarea>
                        </div>
                        <div className="col-md-12 mt-4">
                          <button   onClick={handleSubmit}
                          className="custom-btn col-md-6">
                            Save
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

export default Profile;
