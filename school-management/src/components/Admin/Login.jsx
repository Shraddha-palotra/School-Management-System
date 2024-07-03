import React, { useState } from "react";
import dummy_logo from "../assets/images/dummy_logo.png";
import eye from "../assets/images/eye.png";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    let formErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = "Email is required"
    }else if (!emailPattern.test(email)) {
      formErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      formErrors.password = "Password is required";
    }else if (password.length < 8) {
      formErrors.password = "Password should be at least 8 characters";
    }

    setErrors(formErrors);

    Axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    })
      .then((response) => {
      console.log("user is not found");
        if (response.data.status) 
          {localStorage.setItem("user",JSON.stringify(response.data.user))
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Login form submitted with:", email, password);
  };
  return (
    <>
      <div className="login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-3 col-lx-6 col-lg-6 col-md-10 col-sm-11 col-11 mx-auto">
              <div className="login-form">
                <div className="header-img">
                  <img src={dummy_logo} alt="" />
                </div>
                <div className="heading-text">
                  <h3>Login</h3>
                  <p>Hey, Enter your details to get sign in to your account</p>
                </div>
                <div className="form">
                  <form className="row g-2" onSubmit={handleLoginSubmit}>
                    <div className="col-md-12">
                      <label htmlFor="email" className="custom-form-label">
                        Email
                      </label>
                      <input
                        className="custom-input-field"
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                      />
                      {errors.email && (
                      <p className="required-validation">{errors.email}</p>
                    )}
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="password" className="custom-form-label">
                        Password
                      </label>

                      <div className="possionIconInput">
                        <img src={eye} alt="" className="eyeIconView" />

                        <input
                          className="custom-input-field"
                          type="password"
                          id="lastname"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        
                      </div>
                      {errors.password && (
                      <p className="required-validation">{errors.password}</p>
                    )}
                    </div>
                    <div className="forget-password">
                      <div className="form-check d-flex">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                        />
                        &nbsp;
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                        >
                          Remember Me
                        </label>
                      </div>
                      {/* <Link to="/forgot_password" className="password-btn">
                        Forgot Password?
                      </Link> */}
                      <span
                        onClick={() => {
                          navigate("/forgot_password");
                        }}
                        className="password-btn"
                      >
                        Forgot Password?
                      </span>
                    </div>
                    <div className="col-md-12 mt-4">
                      {/* <Link to="/login" className="custom-btn">
                        Login
                      </Link> */}
                      <button
                        className="custom-btn">
                        Login
                      </button>
                    </div>
                    <p className="d-flex mt-4 justify-content-center">
                      Don't have an Account ? &nbsp;
                      <span
                        onClick={() => {
                          navigate("/");
                        }}
                        className="text-primary"
                      >
                        SignUp
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
export default Login;
