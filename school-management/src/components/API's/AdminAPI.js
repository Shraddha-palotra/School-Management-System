import Axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

export const signup = (name, phoneNumber, email, password, confirmPassword) => {
  return Axios.post(`${BASE_URL}/signup`, {
    name,
    phoneNumber,
    email,
    password,
    confirmPassword,
  });
};

export const resetPassword = (token, password, confirmPassword) => {
  return Axios.post(`${BASE_URL}/resetpassword/${token}`, {
    password,
    confirmPassword,
  });
};
export const forgotPassword = (email) => {
  return Axios.post(`${BASE_URL}/forgot_password`, { email });
};

export const login = (email, password) => {
  return Axios.post(`${BASE_URL}/login`, { email, password });
};

export const verifyOtp = (email, otp, name, phoneNumber, password) => {
     return Axios.post(`${BASE_URL}/verify-otp`, {
       email,
       otp,
       name,
       phoneNumber,
       password,
     });
   };