import React, { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import dummy_logo from "../assets/images/dummy_logo.png"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


function VerifyOtp({ email,name, phoneNumber, password,setOtpSent, navigate}) {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState("");
  const {t} = useTranslation();
   
  const handleVerifyOtp = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:8080/auth/verify-otp", {
      email,
      otp,
      name,
      phoneNumber,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          localStorage.removeItem("credentials");
          // localStorage.setItem("user", JSON.stringify(response.data.savedUser));
          localStorage.setItem("token",response.data.token)
          toast.success("Verify OTP successfully");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("Internal server error",err);
        if (err.response && err.response.data) {
          setErrors(err.response.data.message)
        }
        
      });
  };

  const handleBack = () => {
     console.log("Back button clicked");
     // navigate("/");
     // window.location.reload()
     setOtpSent && setOtpSent(false)
   };

  return (
<div className="login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-3 col-lx-6 col-lg-6 col-md-10 col-sm-11 col-11 mx-auto">
              <div className="login-form">
                <div className="header-img">
                  <img src={dummy_logo} alt="" />
                </div>
                <div className="heading-text">
                  <h3> {t("Verify OTP")}</h3>
                  <p>{t("Enter the OTP sent to your email !")}</p>
                </div>
                <div className="form">
                  <form className="row g-2" onSubmit={handleVerifyOtp}>
                    <div className="col-md-12">
                      <label htmlFor="otp" className="custom-form-label">
                      {t("OTP")}
                      </label>
                      <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                        className="custom-input-field"
                        type="text"
                        id="otp"
                        placeholder={t("Enter otp")}
                      />
                      {errors && (
                      <p className="required-validation">{errors}</p>
                    )}
                    </div>

                    <div className="col-md-12 mt-4">
                      <button
                        className="custom-btn" 
                        type="submit" >
                        {t("Verify OTP")}
                      </button>
                    </div>
                    <div className="col-md-12 mt-4">
                      <p className="d-flex mt-4 justify-content-center">
                      <Link to="/" 
                      onClick={handleBack}
                      >
                         {t("Back")}
                      </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default VerifyOtp;