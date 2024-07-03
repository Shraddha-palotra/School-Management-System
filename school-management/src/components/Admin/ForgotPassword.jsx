import React, { useState } from "react";
import dummy_logo from "../assets/images/dummy_logo.png";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      formErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
    
      setErrors(formErrors);

    Axios.post("http://localhost:8080/auth/forgot_password", {
      email
    }).then((response) => {
      if (response.data.status) {
        
        alert("check your email Box for password link")
        navigate("/login");
      }
     console.log(response.data)
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("forgotpassword form submitted with:", email);

  };
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
                  <h3>Forgot Password</h3>
                  <p>Enter the email address associated with your account.</p>
                </div>
                <div className="form">
                  <form
                    className="row g-2"
                    onSubmit={handleForgotPasswordSubmit}
                  >
                    <div className="col-md-12">
                      <label htmlFor="email" className="custom-form-label">
                        Email
                      </label>
                      <input
                        className="custom-input-field"
                        type="test"
                        id="email"
                        placeholder="Enter Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                       {errors.email && (
                        <p className="required-validation">{errors.email}</p>
                      )}
                    </div>

                    <div className="col-md-12 mt-4">
                      <button
                    
                        className="custom-btn"
                      >
                        Continue
                      </button>
                    </div>
                    <p className="d-flex mt-4 justify-content-center">
                      {/* <Link to="/login">Back</Link>*/}
                      <span
                        onClick={() => {
                          navigate("/login");
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

export default ForgotPassword;
