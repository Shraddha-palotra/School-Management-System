import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import camera from "../assets/images/camera.png";
import Sidebar from "../Sidebar/Sidebar";
import HeaderDash from "../Dashboard/HeaderDash";
import { useTranslation } from "react-i18next";
import {useValidation} from "../../utils/validations";
import { addStudent } from "../API's/StudentAPI";

function Add_Students({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  
  const {StudentValidation} = useValidation();
  const [rollNumber, setRollNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [classname, setClassname] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [section, setSection] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const {t} = useTranslation();

  const [ profileImage, setProfileImage] = useState("");

  const handleImageChange = async (e) => {
    setProfileImage(e.target.files[0]);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit fun of add student called");
    console.log(rollNumber)
    console.log(studentName);
    console.log(fatherName);
    console.log(motherName);
    console.log(phoneNumber);
    console.log(classname);
    console.log(dateOfBirth);
    console.log(section);
    console.log(gender);
    console.log(address);
     console.log(profileImage);
    
     const formData = new FormData();
    formData.append("rollNumber", rollNumber)
    formData.append("studentName", studentName);
    formData.append("fatherName", fatherName);
    formData.append("motherName", motherName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("classname", classname);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("section", section);
    formData.append("gender", gender);
    formData.append("address", address);
    
    if (profileImage) formData.append('profileImage', profileImage);
    console.log("fromdata is ",formData)
   
    const formErrors = StudentValidation({
      rollNumber,
      studentName,
      fatherName,
      motherName,
      phoneNumber,
      classname,
      dateOfBirth,
      section,
      gender,
      address,
      profileImage,
      t,
     });
    setErrors(formErrors);
    console.log("formerrors",formErrors);

  if (Object.keys(formErrors).length > 0) {
    return; 
  }

  try {
    const response = await addStudent(formData);
    console.log(response);
    if (response.data.status) {
      toast.success("Successfully added new student");
      setTimeout(() => {
        navigate("/student");
      }, 1000);
    } else {
      setErrors({ rollNumber: response.data.message });
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      <ToastContainer />
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
                              {t("Add Student")}
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
                        <img src={profileImage ? URL.createObjectURL(profileImage) : `http://localhost:8080${profileImage}`} alt="" />
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
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      <h6>{t("Profile Image")}</h6>
                    </div>
                  </div>
                  <div className="col-xxl-10">
                    <form className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="rollnumber" className="custom-form-label">
                          {t("Roll Number")}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="rollnumber"
                          placeholder={t("Enter Roll Number")}
                          value={rollNumber}
                          onChange={(e) =>setRollNumber(e.target.value)}
                        />
                        {errors.rollNumber && (
                          <p className="required-validation">
                            {errors.rollNumber}
                          </p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="studentname" className="custom-form-label">
                          {t("Student Name")}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="studentname"
                          placeholder={t("Enter Name")}
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                        />
                        {errors.studentName && (
                          <p className="required-validation">
                            {errors.studentName}
                          </p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="fathername"
                          className="custom-form-label"
                        >
                         {t("Father Name")}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="fathername"
                          placeholder={t("Enter Father Name")}
                          value={fatherName}
                          onChange={(e) => setFatherName(e.target.value)}
                        />
                        {errors.fatherName && (
                          <p className="required-validation">
                            {errors.fatherName}
                          </p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="mothername"
                          className="custom-form-label"
                        >
                          {t("Mother Name")}{" "}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="mothername"
                          placeholder={t("Enter Mother Name")}
                          value={motherName}
                          onChange={(e) => setMotherName(e.target.value)}
                        />
                        {errors.motherName && (
                          <p className="required-validation">
                            {errors.motherName}
                          </p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="dateOfBirth"
                          className="custom-form-label"
                        >
                          {t("Date Of Birth")}{" "}
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
                          <p className="required-validation">
                            {errors.dateOfBirth}
                          </p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="phonenumber"
                          className="custom-form-label"
                        >
                          {t("Phone Number")}{" "}
                          <span className="required-validation">*</span>
                        </label>
                        <input
                          type="text"
                          className="custom-input-field"
                          id="phonenumber"
                          placeholder={t("Enter Number")}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {errors.phoneNumber && (
                          <p className="required-validation">
                            {errors.phoneNumber}
                          </p>
                        )}
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
                          placeholder={t("Enter Class")}
                          name="classname"
                          value={classname}
                          onChange={(e) => setClassname(e.target.value)}
                        />
                        {errors.classname && (
                          <p className="required-validation">
                            {errors.classname}
                          </p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="class-section"
                          className="custom-form-label"
                        >
                          {t("Section")} <span className="required-validation">*</span>
                        </label>
                        <select
                          className="custom-input-field"
                          value={section}
                          onChange={(e) => setSection(e.target.value)}
                        >
                          <option>{t("Section")}</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
                        {errors.section && (
                          <p className="required-validation">
                            {errors.section}
                          </p>
                        )}
                      </div>
                      <div className="col-md-8">
                        <label htmlFor="gender" className="custom-form-label">
                          {t("Gender")} <span className="required-validation">*</span>
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
                              {t("Male")}
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
                              {t("Female")}
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
                              {t("Other")}
                            </label>
                          </div>
                        </span>
                        {errors.gender && (
                          <p className="required-validation">{errors.gender}</p>
                        )}
                      </div>

                      <div className="col-md-8">
                        <label htmlFor="address" className="custom-form-label">
                          {" "}
                          {t("Address")}
                        </label>
                        <textarea
                          type="text"
                          className="custom-input-field"
                          id="address"
                          placeholder={t("Enter Address")}
                          rows="5"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                        {errors.address && (
                          <p className="required-validation">
                            {errors.address}
                          </p>
                        )}
                      </div>
                      <div className="col-md-12 mt-4">
                        <button
                          onClick={handleSubmit}
                          className="custom-btn col-md-4"
                        >
                          {t("Add Student")}
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
