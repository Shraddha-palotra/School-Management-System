import { Route, Routes } from "react-router-dom";
import React, {useState} from "react";
import "./App.css";
import SignUp from "./components/Admin/SignUp";
import Login from "./components/Admin/Login";
import ForgotPassword from "./components/Admin/ForgotPassword";
import ResetPassword from "./components/Admin/ResetPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import Students from "./components/Student_Management/Students";
import AddStudents from "./components/Student_Management/AddStudents";
import Staff from "./components/Staff_Management/Staff";
import AddStaff from "./components/Staff_Management/AddStaff";
import AddFee  from "./components/Fee_Management/AddFee";
import Fee from "./components/Fee_Management/Fee";
import Profile from "./components/Dashboard/Profile";
import Change_password from "./components/Dashboard/Change_password";
import EditStudents from "./components/Student_Management/EditStudents";
import ViewStudents from "./components/Student_Management/ViewStudents";



 
function App() {
  const [isOpen, setIsOpen] = useState(false); 
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword/>} />
        <Route path="/resetpassword/:token" element={<ResetPassword /> } />
        <Route path="/dashboard" element={<Dashboard isOpen={isOpen} setIsOpen={setIsOpen}/>}/>
        <Route path="/student" element={<Students isOpen={isOpen} setIsOpen={setIsOpen}/>} />
        <Route path="/add-student" element={<AddStudents isOpen={isOpen} setIsOpen={setIsOpen} />} />
        <Route path="/edit-students" element={<EditStudents isOpen={isOpen} setIsOpen={setIsOpen} />} />
        <Route path="/view-students" element={<ViewStudents isOpen={isOpen} setIsOpen={setIsOpen}/>} />
        <Route path="/staff" element={<Staff isOpen={isOpen} setIsOpen={setIsOpen}/>}/>
        <Route path="/add-staff" element={<AddStaff/>} />
        <Route path="/fee" element={<Fee isOpen={isOpen} setIsOpen={setIsOpen}/>} />
        <Route path="/add-fee" element={<AddFee/>} />
        <Route path="/profile" element={<Profile isOpen={isOpen} setIsOpen={setIsOpen}/>} />
       <Route path="/change-password" element={<Change_password isOpen={isOpen} setIsOpen={setIsOpen} 
       />} />
      </Routes>
   
    </>
  );
}

export default App;
