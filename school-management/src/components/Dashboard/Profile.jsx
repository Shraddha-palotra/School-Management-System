import React, { useEffect, useState } from "react";
import profileImg from "../assets/images/profileImg.png";
import camera from "../assets/images/camera.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "./HeaderDash";
import { useTranslation } from "react-i18next";
import { fetchUserData, updateUserProfile } from "../API's/ProfileAPI";


function Profile({ items, isOpen, setIsOpen }) { 
  const [profileImage, setProfileImage] = useState("");
  const [loggedAdmin, setLoggedAdmin] = useState({});
  // console.log('userData',loggedAdmin);
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token)
        .then(data => setLoggedAdmin(data))
        .catch(err => console.error(err));
    } else {
      console.error("No user data found in localStorage");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      return;
    }

    const formData = new FormData();
    formData.append("fullname", loggedAdmin.name || "");
    formData.append("email", loggedAdmin.email || "");
    formData.append("phoneNum", loggedAdmin.phoneNumber || "");
    if (profileImage) formData.append("profileImage", profileImage);

    try {
      const response = await updateUserProfile(loggedAdmin._id, formData);
      if (response.status) {
        localStorage.setItem("user", JSON.stringify(response.updatedProfileUser));
        toast.success("Successfully updated profile");
        setLoggedAdmin(response.updatedProfileUser); 
        setTimeout(() => {
          navigate("/dashboard", { state: { items } });
        }, 1000);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
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
                          <h3>{t("Profile")}</h3>
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
                            <h6>{t("Profile Image")}</h6>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="fullname"
                            className="custom-htmlForm-label"
                          >
                           {t("Full Name")}{" "}
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
                            {t("Email")}
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
                            {t("Contact Number")}{" "}
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
                            {t("Address")}
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
                            {t("Save")}
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