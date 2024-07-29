import { useState } from "react";
import dummy_logo from "../assets/images/dummy_logo.png";
import eye from "../assets/images/eye.png";
import offEye from "../assets/images/offEye.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import VerifyOtp from "./VerifyOtp";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false)
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {t} = useTranslation();

  const [passwordToggle, setPasswordToggle] = useState({
    password: false,
    confirmPassword: false,
  });

  const handlePasswordToggle = (e, key, value) => {
    e.preventDefault();
    // console.log("e", e);
    // console.log("key", key);
    // console.log("value", value);
    setPasswordToggle((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};

    if (!name) formErrors.name = t("Full name is required");
    // console.log(formErrors.name);

    if (!phoneNumber) {
      formErrors.phoneNumber = t("Phone number is required");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = t("Email is required");
    } else if (!emailPattern.test(email)) {
      formErrors.email = t("Please enter a valid email address");
    }

    if (!password) {
      formErrors.password = t("Password is required");
    } else if (password.length < 8) {
      formErrors.password = t("Password should be at least 8 characters");
    }

    if (!confirmPassword) {
      formErrors.confirmPassword = t("Confirm password is required");
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = t("Passwords do not match");
    }

    setErrors(formErrors);

    Axios.post("http://localhost:8080/auth/signup", {
      name,
      phoneNumber,
      email,
      password,
      confirmPassword,
    })
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          toast.success("Successfully SignUp", {autoClose:1000});
          setOtpSent(true);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("credentials", JSON.stringify({email,phoneNumber,name,password}))
        } else {
          setErrors({ email: response.data.message });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    <ToastContainer/>
    {!otpSent ? (

    
      <div className="login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-3 col-lx-6 col-lg-6 col-md-10 col-sm-11 col-11 mx-auto">
              <div className="login-form">
                <div className="header-img">
                  <img src={dummy_logo} alt="" />
                </div>
                <div className="heading-text">
                  <h3>{t("Signup")}</h3>
                  <p>{t("Hey, Enter your details to get sign up to your account")}</p>
                </div>
                <div className="form">
                  <form className="row g-2" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                      <label htmlFor="name" className="custom-form-label">
                        {t("Full Name")}
                      </label>
                      <input
                        type="text"
                        className="custom-input-field"
                        id="Name"
                        placeholder={t("Enter Name")}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                      {errors.name && (
                        <p className="required-validation">{errors.name}</p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="phoneNuber" className="custom-form-label">
                        {t("Phone Number")}
                      </label>
                      <input
                        type="text"
                        className="custom-input-field"
                        id="phoneNuber"
                        placeholder={t("Enter Number")}
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />
                      {errors.phoneNumber && (
                        <p className="required-validation">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="email" className="custom-form-label">
                        {t("Email")}
                      </label>
                      <input
                        type="email"
                        className="custom-input-field"
                        id="email"
                        placeholder={t("Enter Email")}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      {errors.email && (
                        <p className="required-validation">{errors.email}</p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="password" className="custom-form-label">
                        {t("Password")}
                      </label>
                      <div className="possionIconInput">
                        <img
                          onClick={(e) => {
                            handlePasswordToggle(
                              e,
                              "password",
                              !passwordToggle.password
                            );
                          }}
                          src={passwordToggle.password ? eye : offEye}
                          alt=""
                          className="eyeIconView"
                        />
                        <input
                          type={passwordToggle.password ? "text" : "password"}
                          className="custom-input-field"
                          id="lastname"
                          placeholder={t("Enter Password")}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                      {errors.password && (
                        <p className="required-validation">{errors.password}</p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="password" className="custom-form-label">
                       {t("Confirm Password")}
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
                          src={passwordToggle.confirmPassword ? eye : offEye}
                          alt=""
                          className="eyeIconView"
                        />

                        <input
                          type={
                            passwordToggle.confirmPassword ? "text" : "password"
                          }
                          className="custom-input-field"
                          id="lastname"
                          placeholder={t("Enter Password")}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                          }}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="required-validation">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                    <div className="col-md-12 mt-4">
                      <button className="custom-btn">{t("Signup")}</button>
                    </div>
                    <p className="d-flex mt-4 justify-content-center">
                    {t("Already Have an Account?")}  &nbsp;
                      {/* <Link to="/login">Login</Link> */}
                      <span
                        onClick={() => {
                          navigate("/login");
                        }}
                        className="text-primary"
                      >
                        {t("Login")}
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <VerifyOtp 
        email={email}
        name={name}
        phoneNumber={phoneNumber}
        password={password}
        navigate={navigate}
        setOtpSent={setOtpSent}
        />
      )}
    </>
  );
};
export default SignUp;
