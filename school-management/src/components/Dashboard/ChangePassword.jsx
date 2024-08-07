import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "./HeaderDash";
import changePassword from "../assets/images/changePassword.png";
import eye from "../assets/images/eye.png";
import offEye from "../assets/images/offEye.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changeUserPassword } from "../API's/ChangePasswordAPI";
import { useTranslation } from "react-i18next";

function ChangePassword({ isOpen, setIsOpen }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const {t} = useTranslation();

  const navigate = useNavigate();

  const [passwordToggle, setPasswordToggle] = useState({
    oldPassword: false,
    confirmPassword: false,
    newPassword: false,
  });

  const handlePasswordToggle = (e, key, value) => {
    e.preventDefault();
    setPasswordToggle((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {}; 

    if (!oldPassword) {
      formErrors.oldPassword = t("Password is required");
    } else if (oldPassword.length < 8) {
      formErrors.oldPassword = t("Password should be at least 8 characters");
    }

    if (!newPassword) {
      formErrors.newPassword = t("Password is required");
    } else if (newPassword.length < 8) {
      formErrors.newPassword = t("Password should be at least 8 characters");
    }

    if (!confirmPassword) {
      formErrors.confirmPassword = t("Confirm password is required");
    } else if (newPassword !== confirmPassword) {
      formErrors.confirmPassword = t("Passwords do not match");
    }
    setErrors(formErrors);
    setBackendError("");

    if (Object.keys(formErrors).length > 0) {
      return; 
    }

    const userJson = localStorage.getItem("user");
    if (!userJson) {
      toast.error("User not found. Please log in again.");
      return;
    }

    let user;
    try {
      user = JSON.parse(userJson);
    } catch (error) {
      toast.error("User data is corrupted. Please log in again.");
      return;
    }

    if (!user || !user._id) {
      toast.error("Invalid user data. Please log in again.");
      return;
    }

    const userId = user._id;
    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    try {
      const res = await changeUserPassword(userId, data);
      if (res.status) {
        toast.success(t("Successfully updated password"));
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        if (res.field === 'oldPassword') {
          setBackendError(t(res.message));
        }
      }
    } catch (err) {
      if (err.field === 'oldPassword') {
        setBackendError(t(err.message));
      } else {
        console.error(err);
      }
    }
  };

  return (
    <>
      <ToastContainer/>
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
                          <h3>{t("Change_Password")}</h3>
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
                            {t("Old_Password")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <div className="possionIconInput">
                            <img
                              onClick={(e) => {
                                handlePasswordToggle(e,"oldPassword",!passwordToggle.oldPassword);
                              }}
                              src={passwordToggle.oldPassword ? eye : offEye}
                              alt=""
                              className="eyeIconView"
                            />
                            <input
                              type={
                                passwordToggle.oldPassword ? "text" : "password"
                              }
                              className="custom-input-field"
                              id="oldpassword"
                              placeholder={t("Enter_Old_Password")}
                              onChange={(e) => setOldPassword(e.target.value)}
                            />
                          </div>
                          {errors.oldPassword ? (
                            <p className="required-validation">
                              {errors.oldPassword}
                            </p>
                          ) : (
                          backendError && (
                            <p className="required-validation">
                              {backendError}
                            </p>
                          )
                          )}
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="newpassword"
                            className="custom-htmlForm-label"
                          >
                            {t("New Password")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <div className="possionIconInput">
                            <img
                              onClick={(e) => {
                                handlePasswordToggle(
                                  e,
                                  "newPassword",
                                  !passwordToggle.newPassword
                                );
                              }}
                              src={passwordToggle.newPassword ? eye : offEye}
                              alt=""
                              className="eyeIconView"
                            />
                            <input
                              type={
                                passwordToggle.newPassword ? "text" : "password"
                              }
                              className="custom-input-field"
                              id="newpassword"
                              placeholder={t("Enter New Password")}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                          {errors.newPassword && (
                            <p className="required-validation">
                              {errors.newPassword}
                            </p>
                          )}
                        </div>
                        <div className="col-md-12">
                          <label
                            htmlFor="confirmpassword"
                            className="custom-htmlForm-label"
                          >
                            {t("Confirm Password")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <div className="possionIconInput">
                            <img
                              onClick={(e) => {
                                handlePasswordToggle(
                                  e,
                                  "confirmPassword",
                                  !passwordToggle.confirmPassword
                                );
                              }}
                              src={
                                passwordToggle.confirmPassword ? eye : offEye
                              }
                              alt=""
                              className="eyeIconView"
                            />
                            <input
                              type={
                                passwordToggle.confirmPassword
                                  ? "text"
                                  : "password"
                              }
                              className="custom-input-field"
                              id="confirmpassword"
                              placeholder={t("Enter Confirm Password")}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                          {errors.confirmPassword && (
                            <p className="required-validation">
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>

                        <div className="col-md-12 mt-4">
                          <button
                            onClick={handleSubmit}
                            className="custom-btn col-md-4"
                          >
                            {t("Change Password")}
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
     
    </>
  );
}

export default ChangePassword;
