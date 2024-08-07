import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import HeaderDash from '../Dashboard/HeaderDash'
import dummyprofile from '../assets/images/dummyProfile.png'
import camera from "../assets/images/camera.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function ViewStudents({isOpen,setIsOpen}) {

     const navigate = useNavigate();
     const location = useLocation(); 

     const [studentData, setStudentData] = useState(location.state.items);
     const {t} = useTranslation();
     console.log(studentData)
  return (
    <>
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
                                  {t("Student")}
                                </button>
                              </li>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                   {t("View_Student")}
                              </li>
                            </ol>
                          </nav>
                          <h3>{t("Student")}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2">
                      <div className="addProjectlogo">
                        <div className="upload-img-box">
                          <div className="circle">
                            {/* <img src={dummyProfile} alt="" /> */}
                            <img  src={studentData.profileImage ? `http://localhost:8080${studentData.profileImage}` : dummyprofile } alt=''/> 
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
                        <h6>{t("Profile_Image")}</h6>
                      </div>
                    </div>
                    <div className="col-xxl-10">
                      <form className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="rollnumber" className="custom-form-label">
                          {t("Roll_Number")}{" "}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="rollnumber"
                          placeholder="Enter Roll Number"
                          value={studentData.rollNumber}
                          disabled
                        />
                       
                      </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="fullname"
                            className="custom-form-label"
                          >
                            {t("Student_Name")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fullname"
                            placeholder="Enter Name"
                            name='classname'
                            value={studentData.studentName}
                            disabled
                           
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="fathername"
                            className="custom-form-label"
                          >
                            {t("Father_Name")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="fathername"
                            placeholder="Enter Name"
                            name='fatherName'
                            value={studentData.fatherName}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="mothername"
                            className="custom-form-label"
                          >
                            {t("Mother_Name")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="mothername"
                            placeholder="Enter Name"
                            name='motherName'
                            value={studentData.motherName}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="dateofbirth" className="custom-form-label">
                            {t("Date_Of_Birth")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="date"
                            className="custom-input-field"
                            id="dateofbirth"
                            name='dateOfBirth'
                            value={studentData.dateOfBirth}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="phonenumber" className="custom-form-label">
                            {t("Phone_Number")}
                            <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="phonenumber"
                            placeholder="Enter Number"
                            name='phoneNumber'
                            value={studentData.phoneNumber}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="school-class"
                            className="custom-form-label"
                          >
                            {t("Class")} <span className="required-validation">*</span>
                          </label>
                          <input
                            type="text"
                            className="custom-input-field"
                            id="school-class"
                            placeholder="Enter Class"
                            name='classname'
                            value={studentData.classname}
                            disabled
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="class-section"
                            className="custom-form-label"
                          >
                            {t("Section")}
                          </label>
                          <select className="custom-input-field"
                          name='section'
                          value={studentData.section}
                          disabled
                          >
                            <option value="">
                            {t("Section")}
                            </option>
                            <option value="">A</option>
                            <option value="">B</option>
                            <option value="">C</option>
                            <option value="">D</option>
                          </select>
                        </div>
                        <div className="col-md-8">
                          <label htmlFor="gender" className="custom-form-label">
                            {t("Gender")}{" "}
                            <span className="required-validation">*</span>
                          </label>
                          <span className="d-flex">
                            <div className="containGender">
                              <input
                                id="male"
                                type="radio"
                                name="gender"
                                value="male"
                                checked={studentData.gender === "male"}
                                disabled
                              />
                              <label className="ps-1" htmlFor="male">
                                {t("Male")}
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="female"
                                type="radio"
                                name="gender"
                                value="female"
                                checked={studentData.gender === "female"}
                                disabled
                              />
                              <label className="ps-1" htmlFor="female">
                                {t("Female")}
                              </label>
                            </div>
                            <div className="containGender">
                              <input
                                id="other"
                                type="radio"
                                name="gender"
                                value="other"
                                checked={studentData.gender === "other"}
                                disabled
                              />
                              <label className="ps-1" htmlFor="other">
                                {t("Other")}
                              </label>
                            </div>
                          </span>
                        </div>

                        <div className="col-md-8">
                          <label
                            htmlFor="address"
                            className="custom-form-label"
                          >
                            {" "}
                            {t("Address")}
                          </label>
                          <textarea
                            type="text"
                            className="custom-input-field"
                            id="address"
                            placeholder="Enter Address"
                            rows="6"
                            name='address'
                            value={studentData.address}
                            disabled
                          ></textarea>
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
  )
}

export default ViewStudents