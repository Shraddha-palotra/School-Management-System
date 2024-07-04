import React, { useState } from "react";
import Axios from "axios";
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import dummyProfile from "../assets/images/dummyProfile.png";
import camera from "../assets/images/camera.png";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";

function Add_Students({isOpen,setIsOpen}) {
  const navigate = useNavigate();

 
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [classname, setClassname] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [section, setSection] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log(handleSubmit);
    console.log(studentName);
    console.log(fatherName);
    console.log(motherName);
    console.log(phoneNumber);
    console.log(classname);
    console.log(dateOfBirth);
    console.log(section);
    console.log(gender);
    console.log(address);

    let formErrors = {};

    if (!studentName) formErrors.studentName = "Full name is required";

    if (!fatherName) formErrors.fatherName = "Father name is required";
 
    if (!motherName) formErrors.motherName = "Mother name is required";

    const Pattern = /^\d+$/;
    if (!phoneNumber) {
      formErrors.phoneNumber = "Phone number is required";
    } else if (!Pattern.test(phoneNumber)) {
      formErrors.phoneNumber = "Phone number should contain only digits";
    }

    if (!classname) formErrors.classname = "Class is required";

    if (!dateOfBirth) formErrors.dateOfBirth = "Register date of birth is required";

    if (!section) formErrors.section = "Section is required";

    if (!gender) formErrors.gender = "Gender is required";

    if (!address) formErrors.address = "Address is required";


    setErrors(formErrors);

    Axios.post("http://localhost:8080/student/addstudent", {

      studentName,
      fatherName,
      motherName,
      phoneNumber,
      classname,
      dateOfBirth,
      section,
      gender,
      address,
      
    })
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          toast.success("Successfully added new student")
          setTimeout(()=>{
            navigate('/student')
          },1000)
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                <div className="form-body">
                  <div className="row">
                    <div className="col-xxl-12">
                      <div className="greetingsText mb-3">
                        <div className="greetingsText-heading">
                          <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                              <li className="breadcrumb-item">
                                <button
                                  onClick={() => {
                                    navigate("/student");
                                  }}
                                >
                                  {" "}
                                  Student
                                </button>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                              Add Student
                              </li>
                            </ol>
                          </nav>
                          <h3>Student</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2">
                      <div className="addProjectlogo">
                        <div className="upload-img-box">
                          <div className="circle">
                            <img src={dummyProfile} alt="" />
                          </div>
                          <div className="p-image ml-auto">
                            <label htmlFor="logoSelect">
                              <div>
                                <img src={camera} alt="" />
                              </div>
                            </label>
                            <input
                              className="file-upload"
                              id="logoSelect"
                              name="projectLogo"
                              type="file"
                              accept="image/*"
                            />
                            
                          </div>
                        </div>
                        <h6>Profile Image</h6>
                      </div>
                    </div>
                    <div className="col-xxl-10">
                      <form className="row g-3"  >
                        <div className="col-md-4">
                          <label
                            htmlFor="fullname"
                            className="custom-form-label"
                          >
                            Student Name{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            placeholder="Enter Name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                          />
                          {errors.studentName && (
                            <p className="required-validation">{errors.studentName}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="fathername"
                            className="custom-form-label"
                          >
                            Father Name{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fathername"
                            placeholder="Enter Fahter's  Name"
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                          />
                          {errors.fatherName && (
                            <p className="required-validation">{errors.fatherName}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="mothername"
                            className="custom-form-label"
                          >
                            Mother Name{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="mothername"
                            placeholder="Enter Mother's Name"
                            value={motherName}
                            onChange={(e) => setMotherName(e.target.value)}
                          />
                          {errors.motherName && (
                            <p className="required-validation">{errors.motherName}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="dateOfBirth" className="custom-form-label">
                            Date Of Birth{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="date"
                            className="custom-input-field"
                            id="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(e) => setdateOfBirth(e.target.value)}
                          />
                          {errors.dateOfBirth && (
                            <p className="required-validation">{errors.dateOfBirth}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="phonenumber" className="custom-form-label">
                            Phone Number{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="phonenumber"
                            placeholder="Enter Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          {errors.phoneNumber && (
                            <p className="required-validation">{errors.phoneNumber}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="school-class"
                            className="custom-form-label"
                          >
                            Class <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="school-class"
                            placeholder="Enter Class"
                            name="classname"
                            value={classname}
                            onChange={(e) => setClassname(e.target.value)}
                          />
                          {errors.className && (
                            <p className="required-validation">{errors.className}</p>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="class-section"
                            className="custom-form-label"
                          >
                            Section
                          </label>
                          <select className="custom-input-field"
                           value={section} 
                           onChange={(e) => setSection(e.target.value)}
                          >
                            <option 
                           >
                              Section
                            </option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </select>
                          {errors.section && (
                            <p className="required-validation">{errors.section}</p>
                          )}
                        </div>
                        <div className="col-md-8">
                          <label htmlFor="gender" className="custom-form-label">
                            Gender{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <span className="d-flex">
                            <div className="containGender">
                              <input
                                id="male"
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === "male"}
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className="ps-1" htmlFor="male">
                                Male
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="female"
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === "female"}
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className="ps-1" htmlFor="female">
                                Female
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="other"
                                type="radio"
                                name="gender"
                                value="other"
                                checked={gender === "other"}
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className="ps-1" htmlFor="other">
                                Other
                              </label>
                              
                            </div>
                          </span>
                          {errors.gender && (
                            <p className="required-validation">{errors.gender}</p>
                          )}
                        </div>

                        <div className="col-md-8">
                          <label
                            htmlFor="address"
                            className="custom-form-label"
                          >
                            {" "}
                            Address
                          </label>
                          <textarea
                            type="text"
                            className="custom-input-field"
                            id="address"
                            placeholder="Enter Address"
                            rows="5"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          ></textarea>
                          {errors.address && (
                            <p className="required-validation">{errors.address}</p>
                          )}
                        </div>
                        <div className="col-md-12 mt-4">
                          <button
                            onClick={handleSubmit}
                            className="custom-btn col-md-4"
                          >
                            Add Student
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

export default Add_Students;
