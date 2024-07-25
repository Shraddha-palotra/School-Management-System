import React, { useEffect, useState } from "react";
import axios from "axios";
import profileImg from "../assets/images/profileImg.png";
import camera from "../assets/images/camera.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "./HeaderDash";
import {jwtDecode} from 'jwt-decode';

function Profile({ items, isOpen, setIsOpen }) { 
  const [profileImage, setProfileImage] = useState("");
  const [loggedAdmin, setLoggedAdmin] = useState({});
  console.log('userData',loggedAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData();
    } else {
      console.error("No user data found in localStorage");
    }
  }, []);
  
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:8080/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200 && response.data) {
        setLoggedAdmin({...loggedAdmin,user:response.data});
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error(error);
    } 
  };
  
  const handleChange = (e) => {
    console.log(handleChange);
    const { name, value } = e.target;
    console.log("name is", name);
    console.log("value is", value);
    setLoggedAdmin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedAdmin || !loggedAdmin._id) { 
      toast.error("User data is missing.");
      console.log("user data is missing.")
      return;
    }

    const formData = new FormData();
    formData.append("fullname", loggedAdmin.name || "");
    formData.append("email", loggedAdmin.email || "");
    formData.append("phoneNum", loggedAdmin.phoneNumber || "");

    if (profileImage) formData.append("profileImage", profileImage);
    console.log("fromdata is ", formData);

    const fun = async (req, res) => {
      try {
        const id = loggedAdmin._id;
        // console.log("id in profile handle submit", id);
        const res = await axios.put(
          `http://localhost:8080/auth/updateprofile/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log("response is", res.data);
        if (res.data.status) {
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.updatedProfileUser)
          );
          toast.success("Successfully update prodile");
          setTimeout(() => {
            navigate("/dashboard", { state: { items } });
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  };
  return (
    <>
      <ToastContainer />
      <div className="wapper">
        <Sidebar isOpen={isOpen} />
        <div className={`main-container ${isOpen && "main-content_large"}`}>
          <HeaderDash isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="content">
            <div className="row mb-3">
              <div className="col-xxl-12">
                <div className="form-body">
                  <div className="row">
                    <div className="col-xxl-12">
                      <div className="greetingsText mb-3">
                        <div className="greetingsText-heading">
                          <h3>Profile</h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 align-self-center">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </div>

                    <div className="col-lg-6 align-self-center">
                      <form className="row g-3">
                        <div className="col-md-12">
                          <div className="addProjectlogo">
                            <div className="upload-img-box">
                              <div className="circle">
                                 <img
                                  src={
                                    profileImage
                                      ? URL.createObjectURL(profileImage)
                                      : loggedAdmin?.profileImage
                                      ? `http://localhost:8080${loggedAdmin.profileImage}`
                                      : profileImg
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="p-image ml-auto">
                                <label htmlFor="logoSelect">
                                  <div>
                                    <img src={camera} alt="" />
                                  </div>
                                </label>
                                <input
                                  className="file-upload"
                                  id="logoSelect"
                                  name="projectLogo"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </div>
                            </div>
                            <h6>Profile Image</h6>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="fullname"
                            className="custom-htmlForm-label"
                          >
                            Full Name{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            value={loggedAdmin?.name || ""}
                            name="name"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="email"
                            className="custom-htmlForm-label"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="custom-input-field"
                            id="email"
                            value={loggedAdmin?.email || ""}
                            name="email"
                            onChange={handleChange}
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
                            value={loggedAdmin?.phoneNumber || ""}
                            name="phoneNumber"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="address"
                            className="custom-htmlForm-label"
                          >
                            Address
                          </label>
                          <textarea
                            type="text"
                            className="custom-input-field"
                            id="address"
                            rows="4"
                          ></textarea>
                        </div>
                        <div className="col-md-12 mt-4">
                          <button
                            onClick={handleSubmit}
                            className="custom-btn col-md-6"
                          >
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
