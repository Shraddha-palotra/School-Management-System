import React, { useEffect, useState } from "react";
import dummy_logo from "../assets/images/dummy_logo.png";
import eye from "../assets/images/eye.png";
import offEye from "../assets/images/offEye.png"
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
 
  const [passwordToggle, setPasswordToggle] = useState(false)
   
  useEffect(() => {
    // Check if there is a value in local storage for remember me
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    setIsChecked(rememberMe);

    // Retrieve email and password if 'rememberMe' is true
    if (rememberMe) {
      const storedEmail = localStorage.getItem('email') || '';
      const storedPassword = localStorage.getItem('password') || '';
      setEmail(storedEmail);
      console.log(storedPassword);
      setPassword(storedPassword);
    }
  }, []);
                                                                                              
  const handleCheckboxChange = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    localStorage.setItem('rememberMe', newCheckedStatus);

    // Clear email and password from local storage if remember me is unchecked
    if (!newCheckedStatus) {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  };

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

    console.log("Login form submitted with:", email, password);

    if (Object.keys(formErrors).length === 0) {
    Axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    })
      .then((response) => {
      console.log(response);
      
      window.localStorage.setItem("isLoggin", JSON.stringify(true));

      if (response.data.status) {
        localStorage.setItem("user", JSON.stringify(response.data.user));

        localStorage.removeItem("email");
        localStorage.removeItem("password");

        // Store email and password in local storage if remember me is checked
        if (isChecked) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
        } 
        navigate("/dashboard");
      } else {
        setErrors({ [response.data.field]: response.data.msg });
      }
    })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          setErrors({ [ err.response.data.field]: err.response.data.msg})
        }
       
      });

    console.log("Login form submitted with:", email, password);
  };
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
                        <img 
                        onClick={(e) => {
                          setPasswordToggle(!passwordToggle)
                        }}
                        src={passwordToggle  ? eye : offEye}
                         alt="" className="eyeIconView" />

                        <input
                          className="custom-input-field"
                          type={passwordToggle ? "text" : "password"}
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
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        &nbsp;
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckChecked"
                          
                        >
                          Remember Me
                        </label>
                      </div>
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
