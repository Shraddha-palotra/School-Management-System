import React, { useEffect, useState } from "react";
import dummy_logo from "../assets/images/dummy_logo.png";
import eye from "../assets/images/eye.png";
import offEye from "../assets/images/offEye.png"
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { login } from "../API's/AdminAPI";
import { useTranslation } from "react-i18next";

function Login() {
  const {t} = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false)
   
  useEffect(() => {
    const savedCredentials =JSON.parse(localStorage.getItem('credentials'));
    if (savedCredentials) {
      setEmail(savedCredentials.email);
      setPassword(savedCredentials.password); 
      setIsChecked(true);
    }
  }, [])

  Axios.defaults.withCredentials = true;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    let formErrors = {};      

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = t("Email is required");
    }else if (!emailPattern.test(email)) {
      formErrors.email = t("Please enter a valid email address");
    }

    if (!password) {
      formErrors.password = t("Password is required");
    }else if (password.length < 8) {
      formErrors.password = t("Password should be at least 8 characters");
    }

    setErrors(formErrors);

    console.log("Login form submitted with:", email, password);

   
    if (Object.keys(formErrors).length === 0) {
      login(email, password)
        .then((response) => {
          console.log(response);
          
          if (response.data.status) {
            localStorage.setItem("token", response.data.token);

            if (isChecked) {
              localStorage.setItem("credentials", JSON.stringify({ email, password }));
            } else {
              localStorage.removeItem("credentials");
            }
            
            toast.success("Successfully Logged In");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          } else {
            setErrors({ [response.data.field]: response.data.message });
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            setErrors({ [err.response.data.field]: err.response.data.message });
          } else {
            console.log(err);
          }
        });
    }
  };
  return (
    <>
    <ToastContainer/>
      <div className="login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-3 col-lx-6 col-lg-6 col-md-10 col-sm-11 col-11 mx-auto">
              <div className="login-form">
                <div className="header-img">
                  <img src={dummy_logo} alt="" />
                </div>
                <div className="heading-text">
                  <h3>{t("Login")}</h3>
                  <p>{t("Hey, Enter your details to get sign in to your account")}</p>
                </div>
                <div className="form">
                  <form className="row g-2" onSubmit={handleLoginSubmit}>
                    <div className="col-md-12">
                      <label htmlFor="email" className="custom-form-label">
                        {t("Email")}
                      </label>
                      <input
                        className="custom-input-field"
                        type="email"
                        id="email"
                        placeholder={t("Enter Email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  
                      />
                      {errors.email && (
                      <p className="required-validation">{errors.email}</p>
                    )}
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="password" className="custom-form-label">
                        {t("Password")}
                      </label>

                      <div className="possionIconInput">
                        <img 
                        onClick={(e) => {
                          setPasswordToggle(!passwordToggle)
                        }}
                        src={passwordToggle  ? eye : offEye}
                         alt="" className="eyeIconView" />

                        <input
                          className="custom-input-field"
                          type={passwordToggle ? "text" : "password"}
                          id="password"
                          placeholder={t("Enter Password")}
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
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                          
                        />
                        &nbsp;
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                          
                        >
                          {t("Remember Me")}
                        </label>
                      </div>
                      <span
                        onClick={() => {
                          navigate("/forgot_password");
                        }}
                        className="password-btn"
                      >
                        {t("Forgot Password?")}
                      </span>
                    </div>
                    <div className="col-md-12 mt-4">
                      <button
                        className="custom-btn">
                        {t("Login")}
                      </button>
                    </div>
                    <p className="d-flex mt-4 justify-content-center">
                      {t("Don't have an Account ?")} &nbsp;
                      <span
                        onClick={() => {
                          navigate("/");
                        }}
                        className="text-primary"
                      >
                        {t("SignUp")}
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
