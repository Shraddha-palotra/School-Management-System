import React from "react";
import dummy_logo from "../assets/images/dummy_logo.png";
import dashboard from "../assets/icons/dashboard.svg";
import student from "../assets/icons/student.png";
import fee from "../assets/icons/fee.png";
import staff from "../assets/icons/staff.svg";
import small_logo from "../assets/images/small_logo.png";
import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  return (
    <>
      <div className={`sidebar ${isOpen ? "sidebar_small" : " "}`}>
        <header>
          <img src={isOpen ? small_logo : dummy_logo} alt="" className="logo" />
        </header>
        <div className="menu">
          <div
            className={
              window.location.pathname === "/dashboard" ? "active item" : "item"
            }
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <button>
              <img src={dashboard} alt="" />
              <span>Dashboard</span>
            </button>
          </div>
          <div
            className={
              window.location.pathname === "/student" ||
              window.location.pathname === "/add-student" ||
              window.location.pathname === "/edit-students" ||
              window.location.pathname === "/view-students"
                ? "active item"
                : "item"
            }
            onClick={() => {
              navigate("/student");
            }}
          >
            <button>
              <img src={student} alt="" />
              <span>Student's </span>
            </button>
          </div>
          <div
            className={
              window.location.pathname === "/staff" ||
              window.location.pathname === "/add-staff" ||
              window.location.pathname === "/edit-staffs" ||
              window.location.pathname === "/view-staffs" 
                ? "active item"
                : "item"
            }
            onClick={() => {
              navigate("/staff");
            }}
          >
            <button>
              <img src={staff} alt="" />
              <span>Staff </span>
            </button>
          </div>
          <div
            className={
              window.location.pathname === "/fee" ||
              window.location.pathname === "/add-fee"
                ? "active item"
                : "item"
            }
            onClick={() => {
              navigate("/fee");
            }}
          >
            <button>
              <img src={fee} alt="" />
              <span>Fee </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
